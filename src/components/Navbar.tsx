import { DropletOff, LucideDroplet, Store } from "lucide-react"

const Navbar = ({ dropOpen, setDropOpen }: { dropOpen: boolean, setDropOpen: (drop: boolean ) => void }): JSX.Element => {
  return (
    <div className="flex justify-between">
        <h1 className="font-bold text-3xl text-black flex items-center">Store <Store className="mx-2" /></h1>
        {dropOpen === true ? <DropletOff className="mt-3 cursor-pointer md:hidden" onClick={() => setDropOpen(!dropOpen)} /> : <LucideDroplet className="mt-3 cursor-pointer md:hidden" onClick={() => setDropOpen(!dropOpen)} />}
    </div>
  )
}

export default Navbar