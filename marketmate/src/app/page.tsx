import { ChakraProvider } from "@chakra-ui/react"
import ArtistPreview from "../../components/ArtistPreview"


function Home() {
    return (
        <ChakraProvider>
            <div>
            <span>This is the homepage</span>
            <ArtistPreview shopLogo={"https://via.placeholder.com/100"} images={["https://via.placeholder.com/100", "https://via.placeholder.com/110", "https://via.placeholder.com/120", "https://via.placeholder.com/130", "https://via.placeholder.com/140", "https://via.placeholder.com/150", "https://via.placeholder.com/160"]}/>
            {/* <ArtistPreview images={["https://via.placeholder.com/130", "https://via.placeholder.com/140", "https://via.placeholder.com/150"]}/> */}
        </div>
        </ChakraProvider>
    )
}
 
export default Home