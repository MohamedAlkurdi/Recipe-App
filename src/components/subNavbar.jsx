export default function SubNavbar({props}){
    const pageSections = props;
    const renderSubNavbar = pageSections.map((section)=>{
        return <a className="subnavbar-item" href={`#${section}`}>{section}</a>
    })
    return(
        <div className="subnavbar">
            {renderSubNavbar}
        </div>
    )
}