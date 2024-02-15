import { ChakraProvider } from "@chakra-ui/react"
import ArtistPreview from "../app/components/ArtistPreview"


function Home() {
    return (
        <ChakraProvider>
            <div>
            <span>This is the homepage</span>
            {/* The line below is just some dummy props for showing what the component looks like, it'll be deleted before merge */}
            <ArtistPreview shopName="tiffany gloria" shopLink="/home" shopDescription="Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of de Finibus Bonorum et Malorum by Cicero, written in 45 BC. This book is a treatise" shopLogo={"https://via.placeholder.com/100"} images={["https://via.placeholder.com/100", "https://via.placeholder.com/110", "https://via.placeholder.com/120", "https://via.placeholder.com/130", "https://via.placeholder.com/140", "https://via.placeholder.com/150", "https://via.placeholder.com/160"]}/>
        </div>
        </ChakraProvider>
    )
}
 
export default Home