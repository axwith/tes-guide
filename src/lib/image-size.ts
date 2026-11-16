import fs from 'fs'
import path from 'path'

/**
 * public 아래 JPEG·PNG의 가로·세로를 빌드 때 읽는다.
 * <img>에 width·height를 넣어 지연 로드 중에도 자리를 잡아 두면 목차 이동 위치가 어긋나지 않는다.
 */
export function getImageSize(src: string): { width: number; height: number } | null {
  if (!src.startsWith('/')) return null
  let buf: Buffer
  try {
    buf = fs.readFileSync(path.join(process.cwd(), 'public', decodeURI(src)))
  } catch {
    return null
  }
  // PNG: IHDR
  if (buf.length > 24 && buf.readUInt32BE(0) === 0x89504e47) {
    return { width: buf.readUInt32BE(16), height: buf.readUInt32BE(20) }
  }
  // JPEG: SOFn 마커
  if (buf[0] !== 0xff || buf[1] !== 0xd8) return null
  let i = 2
  while (i + 9 < buf.length) {
    if (buf[i] !== 0xff) {
      i++
      continue
    }
    const marker = buf[i + 1]
    if (marker === 0xff) {
      i++
      continue
    }
    if (marker === 0xd8 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      i += 2
      continue
    }
    const len = buf.readUInt16BE(i + 2)
    const isSof = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc
    if (isSof) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) }
    }
    i += 2 + len
  }
  return null
}
