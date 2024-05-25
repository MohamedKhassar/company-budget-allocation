import { ChevronDown, MinusCircle, PlusCircle } from "lucide-react"
import { ChangeEvent, useState } from "react";
interface Data {
    id: number
    name: string;
    budget: number;
}
enum Currency {
    dollar = "$ Dollar",
    pound = "£ Pound",
    euro = "€ Euro",
    rupee = "₹ Rupee"
}
const App = () => {
    const [data, setData] = useState<Data[]>([
        {
            id: 1,
            name: "marketing",
            budget: 50,
        },
        {
            id: 2,
            name: "finance",
            budget: 300,
        },
        {
            id: 3,
            name: "sales",
            budget: 70,
        },
        {
            id: 4,
            name: "human resource",
            budget: 40,
        },
        {
            id: 5,
            name: "IT",
            budget: 500,
        },

    ])
    const [allocationValue, setAl] = useState<number>(0)
    const [budget, setBudget] = useState<number | undefined>(2000)
    const [dep, setDep] = useState<string>("marketing")
    const [currency, setCurr] = useState<Currency>(Currency.dollar)

    const spentSoFar = () => {
        let sum = 0
        data.map((item) => {
            sum += item.budget
        })
        return sum
    }
    const remaining = () => {
        return budget! - spentSoFar()
    }
    const increase = () => {
        setData(
            data.map((item) => {
                if (item.name === dep) {
                    if (allocationValue <= remaining()) {
                        return {
                            ...item,
                            budget: item.budget + allocationValue,
                        }
                    } else {
                        alert(`the value cannot exceed remaining funds ${currency.slice(0, 1) + " " + remaining()}`)
                    }
                }
                return item
            })
        )
    }
    const budgetExceed = (e: ChangeEvent<HTMLInputElement>) => {
        if (Number(e.target.value) > 20000) {
            setBudget(20000)
            alert("budget not exceeding 20000")
        }
        else if (Number(e.target.value) < spentSoFar()) {
            alert("You cannot reduce the budget value lower than the spending")
        } else {
            setBudget(Number(e.target.value))
        }
    }

    const dropDown = () => {
        const dropDownItem = document.querySelector('#dropDown')
        if (dropDownItem) {
            dropDownItem.classList.toggle('hidden')
        }
    }

    const decreaseBy10 = (id: number) => {
        setData(
            data.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        budget: item.budget - 10,
                    }
                }
                return item
            })
        )
    }
    const increaseBy10 = (id: number) => {
        setData(
            data.map((item) => {
                if (item.id === id) {
                    return {
                        ...item,
                        budget: item.budget + 10,
                    }
                }
                return item
            })
        )
    }

    return (
        <div className="container h-screen flex flex-col gap-y-20 justify-center">
            <h1 className="text-left text-4xl font-medium">Company's Budget allocation</h1>
            <div className="grid grid-cols-4 gap-x-8">
                <div className="flex p-4 items-center gap-x-2 bg-gray-300 rounded-md">
                    <span className="capitalize text-nowrap">
                        Budget :
                    </span>
                    <div className="flex w-full items-center gap-x-2">
                        {currency.slice(0, 1)}
                        <input className="rounded p-1 outline-none w-full" min={0} value={budget} max={20000} onChange={budgetExceed} type="number" placeholder="" />
                    </div>
                </div>
                <div className="flex p-4 items-center gap-x-4 bg-teal-500 rounded-md">
                    <span className="capitalize text-teal-900">
                        remaining :
                    </span>
                    <p>{currency.slice(0, 1)}{budget! > 0 ? remaining() : 0}</p>
                </div>
                <div className="flex p-4 items-center gap-x-4 bg-sky-300 rounded-md">
                    <span className="capitalize text-sky-900">
                        spent so far :
                    </span>
                    <p>{currency.slice(0, 1)}{spentSoFar()}</p>
                </div>
                <div className="flex p-4 items-center gap-x-4 w-fit">
                    <div className="relative w-full cursor-pointer space-y-1" onClick={dropDown}>
                        <span className="capitalize bg-green-400 text-white font-medium w-fit items-center p-3 rounded-md flex" >
                            department :({currency}) <ChevronDown size={20} strokeWidth={4} />
                        </span>
                        <div id="dropDown" className="hidden absolute border w-full top-13 bg-green-300 border-green-500 rounded-md">
                            <div onClick={() => setCurr(Currency.dollar)} className="hover:bg-green-200 p-1 px-3">{Currency.dollar}</div>
                            <div onClick={() => setCurr(Currency.euro)} className="hover:bg-green-200 p-1 px-3">{Currency.euro}</div>
                            <div onClick={() => setCurr(Currency.pound)} className="hover:bg-green-200 p-1 px-3">{Currency.pound}</div>
                            <div onClick={() => setCurr(Currency.rupee)} className="hover:bg-green-200 p-1 px-3">{Currency.rupee}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <h1 className="text-4xl font-medium capitalize">allocation</h1>
                <div className="relative overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="capitalize">
                            <tr className="border-b">
                                <th scope="col" className="px-6 py-3">
                                    department
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    allocated budget
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    increase by 10
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    decrease by 10
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, i) =>
                                <tr key={i} className="border-b">
                                    <th scope="row" className="capitalize px-6 py-4 font-medium text-gray-900">
                                        {item.name}
                                    </th>
                                    <td className="px-6 py-4">
                                        {currency.slice(0, 1)}{item.budget}
                                    </td>
                                    <td className="px-6 py-4">
                                        <PlusCircle className="cursor-pointer" color="white" fill="green" size={30} onClick={() => increaseBy10(item.id)} />
                                    </td>
                                    <td className="px-6 py-4">
                                        <MinusCircle className="cursor-pointer" color="white" fill="darkred" size={30} onClick={() => decreaseBy10(item.id)} />
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

            </div>
            <div className="space-y-6">
                <h1 className="text-4xl font-medium capitalize">change allocation</h1>
                <div className="grid grid-cols-3 gap-x-8">
                    <div className="flex items-center border rounded-md">
                        <span className="bg-gray-300 border-1 p-2 rounded-l-md capitalize">department</span>
                        <select onChange={(e) => setDep(e.target.value)} className="capitalize w-full p-2 rounded-r-md">
                            {data.map(item =>
                                <option key={item.id}>{item.name}</option>
                            )}
                        </select>
                    </div>
                    <div className="flex items-center border rounded-md">
                        <span className="bg-gray-300 border-1 p-2 rounded-l-md capitalize">allocation</span>
                        <select className="w-full p-2 rounded-r-md">
                            <option>Add</option>
                            <option>Remove</option>
                        </select>
                    </div>
                    <div className="flex items-center border rounded-md">
                        <span className="w-full flex items-center px-2">
                            {currency.slice(0, 1)}
                            <input className="w-full rounded p-1 outline-none" onChange={(e) => setAl(Number(e.target.value))} type="number" placeholder="" />
                        </span>
                        <button className="capitalize bg-blue-500 text-white rounded-r-md h-full w-full" onClick={increase}>save</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default App
