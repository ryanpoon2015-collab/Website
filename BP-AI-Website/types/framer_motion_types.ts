import { motion, type MotionProps } from 'framer-motion'

// Define types for different HTML elements with motion props
type MotionDivProps = MotionProps & React.HTMLAttributes<HTMLDivElement>
type MotionH2Props = MotionProps & React.HTMLAttributes<HTMLHeadingElement>
type MotionPProps = MotionProps & React.HTMLAttributes<HTMLParagraphElement>
type MotionAProps = MotionProps & React.AnchorHTMLAttributes<HTMLAnchorElement>
type MotionSvgProps = MotionProps & React.SVGProps<SVGSVGElement>
type MotionRectProps = MotionProps & React.SVGProps<SVGRectElement>

// Export typed motion components
export const MotionDiv = motion.div as React.FC<MotionDivProps>
export const MotionH2 = motion.h2 as React.FC<MotionH2Props>
export const MotionP = motion.p as React.FC<MotionPProps>
export const MotionA = motion.a as React.FC<MotionAProps>
export const MotionSvg = motion.svg as React.FC<MotionSvgProps>
export const MotionRect = motion.rect as React.FC<MotionRectProps>