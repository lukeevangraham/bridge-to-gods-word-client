import NavigationItem from "./NavigationItem/NavigationItem"

const NavigationItems = ({ links }) => (
    <>
        {links.map(link => (
            <NavigationItem item={link} />
        ))}
    </>
)

export default NavigationItems;