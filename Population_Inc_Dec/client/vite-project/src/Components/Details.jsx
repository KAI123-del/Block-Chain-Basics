import React from 'react'

function Details(props) {
    const popCount=[220,45,300];
    const parsedInc=props.Inc;
    const parsedDec=props.Dec;
    const parsedCount=props.Count;

    return (
        <React.Fragment>
            <div className='mt-12 flex justify-center items-center'>
                <table className="table-auto shadow-xl rounded-lg  w-1/2 text-center leading-8" >
                    <thead className='border shadow bg-gray-800 text-white tracking-wide '>
                        <tr className=''>
                            <th className=''>Country</th>
                            <th>Initial Population</th>
                            <th>Incremented/Decremented Population</th>

                        </tr>
                    </thead>
                    <tbody className=''>
                        <tr className='font-semibold'>
                            <td>India</td>
                            <td>{popCount[0]}</td>
                            <td>{ (parsedCount=='India' ? parsedInc:<p> </p>) || (parsedCount=='India' ? parsedDec:<p> </p>) }</td>

                        </tr>
                        <tr className='font-semibold'>
                            <td>Ukraine</td>
                            <td>{popCount[1]}</td>
                            <td>{(parsedCount=='Ukraine' ? parsedInc:<p> </p>) || (parsedCount=='Ukraine' ? parsedDec:<p> </p>)}</td>

                        </tr>
                        <tr className='font-semibold'>
                            <td>Russia</td>
                            <td>{popCount[2]}</td>
                            <td>{(parsedCount=='Russia' ? parsedInc:<p> </p>) || (parsedCount=='Russia' ? parsedDec:<p> </p>) }</td>

                        </tr>
                    </tbody>
                </table>
            </div>
        </React.Fragment>
    )
}

export default Details