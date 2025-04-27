export default function Loading(){
    return(
        <div className="flex items-center justify-center h-full">
                <div className="flex flex-col items-center gap-4 mt-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                    <p className="text-lg">Loading</p>
                </div>
        </div>
    )
}