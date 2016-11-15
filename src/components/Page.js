import React, {Component, PropTypes} from 'react';

export default  class Page extends Component {
    onYearClick(e) {
        this.props.getPhotos(+e.target.innerText);
    }

    render() {
        const {year, photos, fetching}  = this.props;
        let block = (fetching
            ? <p>Loading...</p>
            : photos.map((v, key) => <p key={key}>Типа фотка {v} {year} года</p>));
        return <div>
            <p>
                {[2016, 2015, 2014].map((v, index) =>
                    <button key={index} onClick={::this.onYearClick}>{v}</button>
                )}
            </p>
            <h3>{year} год</h3>
            {block}
        </div>
    }
}

// Какие свойства должны быть указаны
Page.propTypes = {
    name: PropTypes.string.isRequired
    year: PropTypes.number.isRequired,
    photos: PropTypes.array.isRequired,
    fetching: PropTypes.bool.isRequired,
    getPhotos: PropTypes.func.isRequired
};