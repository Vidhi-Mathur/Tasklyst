export const LoadingSpinner = ({ size = 64 }) => {
    const sizeStyle = {
        height: `${size}px`,
        width: `${size}px`,
    };
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-50 z-50">
            <div style={sizeStyle} className="animate-spin rounded-full border-t-2 border-b-2 border-gray-900"></div>
        </div>
    )
}
