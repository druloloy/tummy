import React, { useCallback, useEffect, useMemo } from 'react'
import { Swiper, SwiperSlide as Slide } from 'swiper/react'
import 'swiper/css'
import { LazyLoadImage } from 'react-lazy-load-image-component'
import { Autoplay } from 'swiper/modules'
import { getColor, useColor } from 'color-thief-react'

interface SlideItemProps {
  imgSrc: string
  title: string
  description: string
  label: string
  ambientColor?: string
}

const SlideItem: React.FC<SlideItemProps> = ({imgSrc, title, description, label, ambientColor}) => {
  return (
    <section className='tmy-slide-item bg-transparent w-full relative h-96 lg:h-[36rem] rounded-3xl shadow-xl overflow-hidden' data-ambient-color={ambientColor}>
      <section className='w-full h-full relative'>
        <div className='absolute w-full h-full bg-gradient-to-t from-primary-900 to-transparent'></div>
        <LazyLoadImage
          alt={title}
          className='w-full h-full object-cover'
          src={imgSrc}
          placeholder={<div className='w-full h-full bg-primary-900'></div>}
          />
      </section>
      <section className='absolute bottom-0 p-8'>
        <span className='text-sm lg:text-xl font-light text-primary-200'>{label}</span>
        <h1 className='text-2xl lg:text-3xl font-medium text-white'>{title}</h1>
        <p className='text-md lg:text-xl leading-tight text-white overflow-hidden line-clamp-3 lg:w-3/5'>{description}</p>
      </section>
    </section>
  )
}

const Items: SlideItemProps[] = [
  {
    imgSrc: './public/images/pexels-chevanon-photography-1108099.jpg',
    title: 'Slide Item 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin lorem in porttitor interdum. Nunc interdum fringilla mollis. Integer venenatis tempus pharetra. Morbi massa orci, accumsan a felis ac, fringilla consectetur neque. Fusce at rhoncus justo, vitae laoreet lorem. Nullam iaculis porta neque, eu cursus dolor porta non. Donec vel purus id eros tincidunt bibendum at eget ligula. Nulla accumsan dui nec velit efficitur congue. Aliquam ornare id lacus id aliquam. Duis vulputate et velit ut blandit. Ut bibendum, nisi quis luctus malesuada, quam justo vestibulum nibh, vel dictum lacus justo id velit.',
    label: 'Your Today\'s Top Picks'
  },
  {
    imgSrc: './public/images/pexels-helena-lopes-2253275.jpg',
    title: 'Slide Item 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin lorem in porttitor interdum. Nunc interdum fringilla mollis. Integer venenatis tempus pharetra. Morbi massa orci, accumsan a felis ac, fringilla consectetur neque. Fusce at rhoncus justo, vitae laoreet lorem. Nullam iaculis porta neque, eu cursus dolor porta non. Donec vel purus id eros tincidunt bibendum at eget ligula. Nulla accumsan dui nec velit efficitur congue. Aliquam ornare id lacus id aliquam. Duis vulputate et velit ut blandit. Ut bibendum, nisi quis luctus malesuada, quam justo vestibulum nibh, vel dictum lacus justo id velit.',
    label: 'Your Today\'s Top Picks'
  },
  {
    imgSrc: './public/images/pexels-kat-smith-551628.jpg',
    title: 'Slide Item 3',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque sollicitudin lorem in porttitor interdum. Nunc interdum fringilla mollis. Integer venenatis tempus pharetra. Morbi massa orci, accumsan a felis ac, fringilla consectetur neque. Fusce at rhoncus justo, vitae laoreet lorem. Nullam iaculis porta neque, eu cursus dolor porta non. Donec vel purus id eros tincidunt bibendum at eget ligula. Nulla accumsan dui nec velit efficitur congue. Aliquam ornare id lacus id aliquam. Duis vulputate et velit ut blandit. Ut bibendum, nisi quis luctus malesuada, quam justo vestibulum nibh, vel dictum lacus justo id velit.',
    label: 'Your Today\'s Top Picks'
  }
]


const BannerCarousel = ({title}) => {
  const {data: initialAmbientColor, loading: initialAmbientColorLoading} = useColor(Items[0].imgSrc, 'hex')
  const [ambientColor, setAmbientColor] = React.useState<string>('')

  useEffect(() => {
    if (!initialAmbientColorLoading) {
      setAmbientColor(initialAmbientColor || '#fff')
    }
  }, [initialAmbientColor])

  return (
      <section className='w-full mt-4 mx-auto'>
        {title && <h1 className='text-3xl lg:text-4xl font-semibold z-0 text-black'>{title}</h1>}
        <Swiper
          style={{
            backgroundColor: ambientColor,
            boxShadow: `0 0 200px 100px ${ambientColor}`
          }}
          className='w-11/12 rounded-3xl'
          spaceBetween={10}
          slidesPerView={1.15}
          onSlideChange={(swiper) => {
              const item = swiper.slides[swiper.activeIndex].querySelector('.tmy-slide-item ')?.getAttribute('data-ambient-color')
              setAmbientColor(item || '#fff')
          }}
          speed={1500}
          autoplay={{
              delay: 5000,
              disableOnInteraction: true
          }}
          modules={[Autoplay]}
          loop
          >
          {
              Items.map((item, index) => {
                  const [color, setColor] = React.useState('')
                  const getAmbientColor = useMemo(async () => {
                      return await getColor(item.imgSrc, 'hex')
                          .then((color) => color)
                    }, [item.imgSrc])

                  React.useEffect(() => {
                      getAmbientColor
                          .then((color) => {
                              setColor(color)
                          })
                  }, [])

                  return <Slide
                      key={index}>
                        <SlideItem
                            imgSrc={item.imgSrc}
                            title={item.title}
                            description={item.description}
                            label={item.label}
                            ambientColor={color}
                        />
                  </Slide>
              })
          }
        </Swiper>
    </section>
  )
}

export default BannerCarousel