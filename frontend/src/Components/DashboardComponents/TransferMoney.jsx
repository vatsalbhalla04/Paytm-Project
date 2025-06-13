export function TransferMoney() {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="border border-gray-300 bg-white shadow-lg rounded-lg p-6 space-y-6 max-w-md w-96 text-card-foreground">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-semibold cursor-default">
            Transfer Money
          </h2>
        </div>

        {/* Friend Info */}
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-full bg-slate-200 flex items-center justify-center">
            <span className="text-2xl text-slate-800 cursor-default">A</span>
          </div>
          <h3 className="text-xl font-medium cursor-default">Friend's Name</h3>
        </div>

        {/* Input + Button */}
        <div className="space-y-4">
          <div className="space-y-2">
            <label
              htmlFor="amount"
              className="block text-sm font-medium text-slate-700"
            >
              Amount (in ₹)
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter the amount"
              className="w-full h-10 px-3 py-2 text-sm rounded-md border border-gray-300 bg-slate-200 focus:outline-none"
            />
          </div>

          <button className="w-full h-10 bg-slate-900 text-white text-sm font-medium rounded-md hover:bg-green-800">
            Initiate Transfer
          </button>
        </div>
      </div>
    </div>
  );
}
