from utils.classes.FileHelper import FileHelper

file_path = "app/firebase.ts"
pattern = r"(const\s+firebaseConfig\s*=\s*)\{[\s\S]*?\};"
replacement = r"const firebaseConfig = {\n  apiKey: \"AIzaSyAda_SFDz_hNs6C0iVif9wDHIyzuNgOBww\",\n  authDomain: \"rice-prism.firebaseapp.com\",\n  projectId: \"rice-prism\",\n  storageBucket: \"rice-prism.firebasestorage.app\",\n  messagingSenderId: \"511662234575\",\n  appId: \"1:511662234575:web:b98fad12ca00ac423450ba\"\n};"
FileHelper.replace_substring(file_path, pattern, replacement)
