import clsx from "clsx"
import useWindowDimension from "hooks/useWindowDimension"
import React, { ReactNode } from "react"

interface SlideButtonProps {
  onClick: ((event: React.MouseEvent<HTMLButtonElement>) => void) | ((event: React.MouseEvent<HTMLButtonElement>) => Promise<void>)
  twStyle?: string
}

type SlideButtonType = (props: SlideButtonProps) => ReactNode

interface SlideNavigationProps {
  stepFunctions: (step: number) => Promise<boolean>
  currentStep: number
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>
  maxStep: number
  NextButton: SlideButtonType
  PreviousButton: SlideButtonType
  scrollToTop?: boolean
}

const SlideNavigation: React.FC<SlideNavigationProps> = ({ 
    stepFunctions,
    currentStep, 
    setCurrentStep,
    NextButton,
    PreviousButton,
    maxStep,
    
    scrollToTop
}) => {
  const {device} = useWindowDimension()

  const handleNext = async (event: React.MouseEvent<HTMLButtonElement>) => {
    const passed = await stepFunctions(currentStep)
    
    if (!passed) return

    setCurrentStep(currentStep < maxStep ? currentStep+1 : currentStep)
    if (scrollToTop) window.scrollTo(0, 0)
  }
  const handlePrevious = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCurrentStep(currentStep > 1 ? currentStep-1 : currentStep)
    if (scrollToTop) window.scrollTo(0, 0)
  }

  const relativeStyle = clsx({
    'fixed bottom-0 left-0 bg-white/50 backdrop-blur-sm': device === 'mobile',
  })

  const style = 'flex flex-row items-center items-center gap-4 py-2 px-4 rounded-full font-bold text-lg duration-300'

  return (
    <section className={`w-full p-4 md:py-4 md:p-0 flex flex-row items-center justify-between gap-4 ${relativeStyle}`}>
      {currentStep > 1 ? <PreviousButton onClick={handlePrevious} twStyle={style} /> : null}
      <NextButton onClick={handleNext} twStyle={style} />
    </section>
  )
}

export default SlideNavigation