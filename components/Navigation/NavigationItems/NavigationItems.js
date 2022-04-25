import NavigationItem from "./NavigationItem/NavigationItem"

const NavigationItems = ({ links }) => (
    <>
        {links.map(link => (
            <NavigationItem key={link.id}  item={link} />
        ))}
    </>
)

export default NavigationItems;