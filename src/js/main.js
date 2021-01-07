const elemsModal = document.querySelectorAll('.modal');
const instanceModal = M.Modal.init(elemsModal);

var addFilter = document.querySelector('.add-filter')

addFilter.onclick = () => {

    var pageWidth = window.location.pathname.indexOf('panel_roger') !== -1 ? 'width: 225px;height:40px' : 'width: 150px;height:40px'

    if(addFilter.className.indexOf('active-filter') === -1){
        addFilter.setAttribute('style',pageWidth);
        addFilter.setAttribute('class','add-filter active-filter')
        addFilter.childNodes[1].setAttribute('style','margin-left: 13px;display: inline-block;width:30px')
        addFilter.childNodes[3].setAttribute('class','material-icons center-align')
        addFilter.childNodes[3].setAttribute('style','display: inline-block;width:30px')
        addFilter.childNodes[5].setAttribute('class','material-icons center-align')
        addFilter.childNodes[5].setAttribute('style','display: inline-block;width:30px')
        addFilter.childNodes[7].setAttribute('class','material-icons center-align')
        addFilter.childNodes[7].setAttribute('style','display: inline-block;width:30px')
        addFilter.childNodes[9].setAttribute('class','material-icons center-align')
        addFilter.childNodes[9].setAttribute('style','display: inline-block;width:30px')
        addFilter.childNodes[11].setAttribute('class','material-icons center-align')
        addFilter.childNodes[11].setAttribute('style','display: inline-block;width:30px')
    }else{
        addFilter.setAttribute('style','');
        addFilter.setAttribute('class','add-filter')
        addFilter.childNodes[1].setAttribute('style','')
        addFilter.childNodes[3].setAttribute('class','material-icons center-align hide')
        addFilter.childNodes[5].setAttribute('class','material-icons center-align hide')
        addFilter.childNodes[7].setAttribute('class','material-icons center-align hide')        
        addFilter.childNodes[9].setAttribute('class','material-icons center-align hide')
        addFilter.childNodes[11].setAttribute('class','material-icons center-align hide')
    

    }
}