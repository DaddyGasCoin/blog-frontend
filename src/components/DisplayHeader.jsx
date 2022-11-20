import { Button } from 'antd';

const DisplayHeader = () => {
    return (
        <div className="flex flex-row-reverse py-1 px-1">
            <Button type="text" size='large'>Login</Button>
            <Button type="text" size='large'>Sign-Up</Button>
        </div>
    )
}

export default DisplayHeader