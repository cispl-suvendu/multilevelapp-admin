import Moment from 'react-moment'

export default function Log({item}) {
    return (
        <div key={item._id} className="border-b border-gray-light3 py-2 my-2">
            <div className="font-heading font-bold text-text-color text-md">{item.message}</div>
            <div className="text-xs text-gray-dark my-2"><Moment local>{item.createdAt}</Moment></div>
        </div>
    )
}
