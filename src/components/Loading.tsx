
interface LoadingProps {
    message: string
}


export default function Loading({ message }: LoadingProps) {
    return (
    <div className="flex">
        <div className="w-8 h-8 border-t-4 border-red-500 border-solid rounded-full animate-spin mr-4">
        </div>
        <p className="font-bold">{message}</p>
    </div>
    )
}