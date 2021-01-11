var btnFilter = document.querySelectorAll('li.add-filter i')[0]
var optionFilter = document.querySelector('.add-filter')
var className;
var filterCount
var iconsCount

btnFilter.onclick = () => {

    filterCount = location.pathname.indexOf('bowser') !== -1 ? 7 : 11;
    iconsCount = location.pathname.indexOf('bowser') !== -1 ? 3 : 5;

    if (optionFilter.className.indexOf('active-filter') === -1) {
        optionFilter.setAttribute('class', 'add-filter active-filter')
        className = 'material-icons center-align not-hide'
    } else {
        optionFilter.setAttribute('class', 'add-filter')
        className = 'material-icons center-align hide'
    }

    for (var i = 3; i <= filterCount; i = i + 2) {
        optionFilter.childNodes[i].setAttribute('class', className)

    }
}