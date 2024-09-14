const NavBar = () => {
    return (
        <>
            <div className="h-[10vh] w-full flex justify-between p-[3vh] bg-[#0f172a] text-white">
                <h1 className="font-bold text-2xl cursor-pointer -tracking-tight">GrowMeOrganic</h1>
                <div className="flex gap-[3vw] font-light text-xl cursor-pointer">
                    <h1>Home</h1>
                    <h1>About</h1>
                    <h1>Help</h1>
                </div>

            </div>
        </>
    )
}
export default NavBar;