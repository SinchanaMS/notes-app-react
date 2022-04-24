import error404 from '../assets/images/error404.svg'

export default function Page404() {
  return (
    <div className='error-page'>
        <img src={error404} alt='page not found'/>
    </div>
  )
}
