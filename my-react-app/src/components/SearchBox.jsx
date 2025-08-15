import { useTransition, useState } from 'react';

export default function SearchBox() {

    const [searchText, setSearchText] = useState('');
    const [res, setResults] = useState(null);

    const [isPending, startTransition]  = useTransition();

    const handleSearch = (e) => {
        const text = e.target.value;
        setSearchText(text); 
        if (text.trim() === '') {
            alert('Please enter a search term');
            return;
        }
        startTransition(() => {
            fetchResults(text).then(data => setResults(data));
        });
        
    };

    function fetchResults(queryText) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Results for "${queryText}"`);
            }, 1000);
        })
    }

    return (<>
    <input type="text" value={searchText} onChange={handleSearch} />
    {isPending && <span>Loading...</span>}
    <div>search result is: {res}</div>
    </>)

}