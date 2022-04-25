import Link from "next/link"

const NavigationItem = ({ item }) => (
    <Link href={item.url}>
        {item.text}
    </Link>
)

export default NavigationItem;