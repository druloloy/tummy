interface HighlightTextProps {
    children: React.ReactNode
    color: ColorsType
    weight: WeightsType
}

const HighlightText: React.FC<HighlightTextProps> = ({children, color, weight}) => {

    return (
        <span className={`text-${color} font-${weight}`}>{children}</span>
    )
}

export default HighlightText