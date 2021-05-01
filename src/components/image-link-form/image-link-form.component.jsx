import './image-link-form.css';

const ImageLinkForm = () => {
    return (
        <div>
            <p className='center f3'>
                {'Please insert a picture'}
            </p>
            <div className='center'>
                <div className='center pa4 br3 shadow-5'>
                <input className='f4 pa2 w-70 center' type='text' />
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'>Detect</button>
            </div>
            </div>
        </div>
    )
}

export default ImageLinkForm;