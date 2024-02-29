import Image from 'next/image'

const Logo = ({ width = 150, height = 150 }) => {
  return (
    <Image
      // I got the warn below, so I set priority true to fix it. If you set it false, it behaves weirdly when it's rendered for the first time.

      // warn-once.js:16 Image with src "/images/logo/logo.png" was detected as the Largest Contentful Paint (LCP).
      // Please add the "priority" property if this image is above the fold.
      // Read more: https://nextjs.org/docs/api-reference/next/image#priority
      priority={true}
      src={`/images/logo/logo.png`}
      alt={'logo'}
      // TODO: I got the warn below, and need to fix it later

      //   warn-once.js:16 Image with src "/images/logo/logo.png" has either width or height modified, but not the other.
      //   If you use CSS to change the size of your image, also include the styles 'width: "auto"' or 'height: "auto"' to maintain the aspect ratio.
      width={width}
      height={height}
    />
  )
}

export { Logo }
