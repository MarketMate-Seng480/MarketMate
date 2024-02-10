import Navbar from "./Navbar"

const PageContainer: React.FC = () => {
    return (
        <div style={{border:"2px solid black"}}>
            This is the PageContainer component
            <Navbar/>
            <div>rest of page (children)</div>
        </div>
    )
}

export default PageContainer