import {Link} from "react-router-dom"
export function BottomWarning({label,buttonText,to}){
    return(
        <div className="py-2 text-md flex justify-center font-medium">
           <div>{label}</div>
        <Link className="cursor-pointer underline pl-1 hover:text-slate-600" to={to}>
        {buttonText}
        </Link>
        </div>
    )
}