import { Column } from 'primereact/column';
import { DataTable, DataTableValue } from 'primereact/datatable';
import { useEffect, useState } from 'react';
import "primereact/resources/themes/lara-dark-indigo/theme.css"
import "primereact/resources/primereact.min.css"
import { FilterMatchMode } from 'primereact/api';

import { FaSearch } from "react-icons/fa";

import { Paginator } from 'primereact/paginator';




interface data {
    title: string;
    place_of_origin: string;
    artist_display: string;
    date_start: number;
    date_end: number;
}


const DataTableComponent = () => {



    const [todo, setTodo] = useState<data[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [page, setPage] = useState<number | undefined>(1)


    useEffect(() => {
        fetch("https://api.artic.edu/api/v1/artworks?page=" + page)
            .then((response) => response.json())
            .then((ApiResponse) => {
                setTodo(ApiResponse["data"] as data[]);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoading(false);
            });
    }, [page]);

    const [filter, setFilter] = useState({
        global: { value: "", matchMode: FilterMatchMode.CONTAINS },
    })
    const [selectedRows, setSelectedRows] = useState<DataTableValue>();


    return (
        <>
            <div className='h-[110vh]'>
                <div className='p-[3vh] '>
                    <div className='flex items-center h-[5.5vh] w-[35vw] bg-[#0f172a] p-3 rounded-xl border border-gray-700 '>
                        <FaSearch className='text-xl text-zinc-600' />
                        <input className='h-[5vh] w-[30vw] p-3 rounded-2xl outline-none bg-[#0f172a] cursor-pointer '
                            placeholder="Search Here"
                            onInput={(e: React.FormEvent<HTMLInputElement>) =>
                                setFilter({
                                    global: { value: (e.currentTarget as HTMLInputElement).value, matchMode: FilterMatchMode.CONTAINS },
                                })
                            }
                        />
                    </div>


                    <div className='pt-[2vh]'>

                        <DataTable
                            value={todo}
                            loading={loading}
                            filters={filter}
                            selection={selectedRows}
                            onSelectionChange={(e) => setSelectedRows(e.value)}
                            dataKey="id"
                        >
                            <Column selectionMode="multiple" headerStyle={{ width: '3em' }} />
                            <Column field="title" header="Title" sortable />
                            <Column field="place_of_origin" header="Place of Origin" sortable />
                            <Column field="artist_display" header="Artist Display" sortable />
                            <Column field="date_start" header="Date Start" sortable />
                            <Column field="date_end" header="Date End" sortable />
                        </DataTable>
                        <Paginator first={page} rows={12} totalRecords={120} rowsPerPageOptions={[10, 20, 30]} onPageChange={(current)=>{setPage(current.page)}} />
                    </div>

                </div>
            </div>

        </>
    );
}

export default DataTableComponent;
