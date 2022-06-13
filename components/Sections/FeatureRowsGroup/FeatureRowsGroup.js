const FeatureRowsGroup = ({  data }) => (
    <div>{console.log("DATA: ", data)}
    {data.features.map(feature => (
        <div>{feature.title}</div>
    ))}
    </div>
)

export default FeatureRowsGroup;