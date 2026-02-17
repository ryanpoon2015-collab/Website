from classes.MyData import MyData
import pywinusb.hid as hid, time
from collections import deque


class Contec_CMS60D:

    def __init__(self) -> None:
        self.SEQ = [
            "80",  # 1) kick
            "81 01",  # 2)
            "82 02",  # 3)
            "9f 1f",  # 4)
            "8e 07 15",  # 5)
            "8e 03 11",  # 6)
            "9f 1f",  # 7)
            "9b 00 1b",  # 8)
            "9b 01 1c",  # 9)
        ]
        self.HEARTBEAT = "9a 1a"  # repeats afterwards

        self.TARGET_HINTS = ("PULSE OXIMETER", "CONTEC", "CMS60", "60D")

        self.dev = None
        self.buf = deque()
        self.myData = MyData()
        self.myData = MyData()
        self._open_iface()

    def _hex2list(self, s):
        return [int(x, 16) for x in s.split()] if s else []

    def _find_iface(self):
        for d in hid.HidDeviceFilter().get_devices() or []:
            name = (
                f"{getattr(d,'vendor_name','')} {getattr(d,'product_name','')}".upper()
            )
            if any(k in name for k in self.TARGET_HINTS):
                d.open()
                outs = d.find_output_reports()
                ins = d.find_input_reports()
                if outs and ins:
                    # choose the OUT report (yours shows [(0,65)])
                    r = outs[0]
                    rid = r.report_id  # expected 0
                    n = len(r.get_raw_data()) or 65
                    return d, r, rid, n
                d.close()
        raise RuntimeError(
            "CMS60D HID interface with OUT+IN not found. Close SpO2 Assistant; run as Admin."
        )

    def _open_iface(self):

        # idempotent open; safe to call before every send
        if self.dev is not None:
            return
        self.dev, self.out_report, self.rid, self.n = self._find_iface()

    def _send_out(self, report, rid, n, payload_hex):
        self._open_iface()
        pkt = [0] * n
        pkt[0] = rid  # report id (0 on your device)
        p = self._hex2list(payload_hex)
        for i, b in enumerate(p, start=1):
            if i >= n:
                break
            pkt[i] = b
        report.set_raw_data(pkt)
        report.send()

    def _on_data(self, data):
        for b in data[1:]:
            self.buf.append(b)
        # dump first bytes of each IN report for visibility
        if len(data) > 1:
            # print("IN:", " ".join(f"{x:02X}" for x in data[1:9]), "…")
            pass
        while len(self.buf) >= 5:
            if (self.buf[0] & 0x80) == 0:
                self.buf.popleft()
                continue
            f = [self.buf.popleft() for _ in range(5)]
            pr, spo2 = f[3], f[4]
            if 20 <= pr <= 254 and 50 <= spo2 <= 100:
                print(f"SpO2={spo2}%  PR={pr} bpm")
                self.myData.save(pulse_rate=pr, spo2=spo2)

    #  --- NEW: explicit flush of any stale buffered bytes and last values
    def flush(self):
        self.buf.clear()
        self.myData.save(pulse_rate=0, spo2=0)

    def start(self):
        self.myData.save(pulse_rate=0, spo2=0, reading_contec=True)
        print("aaa")

        self.flush()
        print("bbb")

        self._open_iface()

        for h in self.SEQ:
            self._send_out(self.out_report, self.rid, self.n, h)
            time.sleep(0.05)

    def read(self):
        print("111")
        if not self.myData.data.reading_contec:
            return None

        print("222")
        self._open_iface()

        if self.dev is None:
            raise RuntimeError("Device not initialized")

        self.dev.set_raw_data_handler(self._on_data)
        print("333")
        self._send_out(self.out_report, self.rid, self.n, self.HEARTBEAT)
        print("444")
        time.sleep(0.5)

        pr = self.myData.data.pulse_rate
        print("555")
        spo2 = self.myData.data.spo2
        print("666")
        if pr > 0 and spo2 > 0:
            self.myData.save(pulse_rate=0, spo2=0, reading_contec=False)
            # self.close()
            return pr, spo2

    # def close(self):
    #     self.dev.close()
