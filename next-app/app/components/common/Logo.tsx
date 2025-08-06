import Image from 'next/image'

export function Logo() {
  return (
    <div className="flex items-center gap-4 mb-10">
    <div><Image src="/logo.png" alt="logo" width={40} height={200}/></div>
    <div><Image src="/text.png" alt="text" width={200} height={200}/></div>
  </div>
  )
}

export default Logo;
