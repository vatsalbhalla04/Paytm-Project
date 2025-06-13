export function Balance({ value }) {
  return (
    <div className="flex ml-11 mt-10">
      <div className="font-medium text-2xl my-[4%] px-[2%]">
        <h1>Your Balance ₹ {value}</h1>
      </div>
    </div>
  );
}
