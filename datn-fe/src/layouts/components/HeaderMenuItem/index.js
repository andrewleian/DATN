import style from './HeaderMenuItem.module.scss'

function HeaderMenuItem({ chirldren }) {
    return (
        <div>
            <a>{chirldren}</a>
        </div>
    )
}

export default HeaderMenuItem