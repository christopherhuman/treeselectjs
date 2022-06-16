import TreeselectInput from"./input.js";import TreeselectList from"./list.js";class Treeselect{#htmlContainer=null;#treeselectList=null;#treeselectInput=null;#transform={top:null,bottom:null};#treeselectInitPosition=null;#containerResizer=null;constructor({value:e,options:t,openLevel:s,appendToBody:i,alwaysOpen:n,showTags:l,clearable:r,searchable:o,placeholder:c}){this.value=e,this.options=t,this.openLevel=s??5,this.appendToBody=i??!0,this.alwaysOpen=n??!1,this.showTags=l??!0,this.clearable=r??!0,this.searchable=o??!0,this.placeholder=c??"Search...",this.srcElement=this.#createTreeselect(),this.scrollEvent=this.scrollWindowHandler.bind(this),this.focusEvent=this.focusWindowHandler.bind(this),this.blurEvent=this.blurWindowHandler.bind(this),this.alwaysOpen&&this.#treeselectInput.openClose()}#createTreeselect(){const t=document.createElement("div"),s=(t.classList.add("treeselect"),new TreeselectList({options:this.options,value:this.value,openLevel:this.openLevel})),i=new TreeselectInput({value:[],showTags:this.showTags,clearable:this.clearable,isAlwaysOpened:this.alwaysOpen,searchable:this.searchable,placeholder:this.placeholder});return this.appendToBody&&(this.#containerResizer=new ResizeObserver(()=>this.updateListPosition(t,s.srcElement,!0))),i.srcElement.addEventListener("input",e=>{e=e.detail.map(e=>e.id);this.value=e,s.updateValue(e),this.#emitInput()}),i.srcElement.addEventListener("open",()=>this.#openList()),i.srcElement.addEventListener("keydown",e=>s.callKeyAction(e.key)),i.srcElement.addEventListener("search",e=>{s.updateSearchValue(e.detail),this.updateListPosition(t,s.srcElement,!0)}),i.srcElement.addEventListener("focus",()=>{document.addEventListener("click",this.focusEvent,!0),document.addEventListener("focus",this.focusEvent,!0),window.addEventListener("blur",this.blurEvent),this.#updateFocusClasses(!0)},!0),this.alwaysOpen||i.srcElement.addEventListener("close",()=>{this.#closeList()}),s.srcElement.addEventListener("input",e=>{i.updateValue(e.detail.groupedIds),this.value=e.detail.ids,i.srcElement.focus(),this.#emitInput()}),s.srcElement.addEventListener("arrow-click",()=>{this.updateListPosition(t,s.srcElement,!0),i.srcElement.focus()}),this.#htmlContainer=t,this.#treeselectList=s,this.#treeselectInput=i,t.append(i.srcElement),t}#openList(){window.addEventListener("scroll",this.scrollEvent,!0),this.appendToBody?(document.body.appendChild(this.#treeselectList.srcElement),this.#containerResizer.observe(this.#htmlContainer)):this.#htmlContainer.appendChild(this.#treeselectList.srcElement),this.updateListPosition(this.#htmlContainer,this.#treeselectList.srcElement,!1),this.#updateOpenCloseClasses(!0)}#closeList(){window.removeEventListener("scroll",this.scrollEvent,!0),this.appendToBody?(document.body.removeChild(this.#treeselectList.srcElement),this.#containerResizer?.disconnect()):this.#htmlContainer.removeChild(this.#treeselectList.srcElement),this.#updateOpenCloseClasses(!1)}#updateDirectionClasses(e,t){var s=t?"treeselect-list--top-to-body":"treeselect-list--top",t=t?"treeselect-list--bottom-to-body":"treeselect-list--bottom";e?(this.#treeselectList.srcElement.classList.add(s),this.#treeselectList.srcElement.classList.remove(t),this.#treeselectInput.srcElement.classList.add("treeselect-input--top"),this.#treeselectInput.srcElement.classList.remove("treeselect-input--bottom")):(this.#treeselectList.srcElement.classList.remove(s),this.#treeselectList.srcElement.classList.add(t),this.#treeselectInput.srcElement.classList.remove("treeselect-input--top"),this.#treeselectInput.srcElement.classList.add("treeselect-input--bottom"))}#updateFocusClasses(e){e?(this.#treeselectInput.srcElement.classList.add("treeselect-input--focused"),this.#treeselectList.srcElement.classList.add("treeselect-list--focused")):(this.#treeselectInput.srcElement.classList.remove("treeselect-input--focused"),this.#treeselectList.srcElement.classList.remove("treeselect-list--focused"))}#updateOpenCloseClasses(e){e?this.#treeselectInput.srcElement.classList.add("treeselect-input--opened"):this.#treeselectInput.srcElement.classList.remove("treeselect-input--opened")}#removeOutsideListeners(){window.removeEventListener("scroll",this.scrollEvent,!0),document.removeEventListener("click",this.focusEvent,!0),document.removeEventListener("focus",this.focusEvent,!0),window.removeEventListener("blur",this.blurEvent)}scrollWindowHandler(){this.updateListPosition(this.#htmlContainer,this.#treeselectList.srcElement,!1)}focusWindowHandler(e){this.#htmlContainer.contains(e.target)||this.#treeselectList.srcElement.contains(e.target)||(this.#treeselectInput.blur(),this.#removeOutsideListeners(),this.#updateFocusClasses(!1))}blurWindowHandler(){this.#treeselectInput.blur(),this.#removeOutsideListeners(),this.#updateFocusClasses(!1)}updateListPosition(e,t,s){var i=e.getBoundingClientRect().y,n=window.innerHeight-e.getBoundingClientRect().y,l=t.clientHeight,n=n<i&&window.innerHeight-i<l,i=n?"top":"buttom",r=t.getAttribute("direction");if(this.#htmlContainer.setAttribute("direction",i),!this.appendToBody)return r===i?void 0:void this.#updateDirectionClasses(n,!1);if(!this.#treeselectInitPosition||s){t.style.transform=null,t.style.display="none",t.style.width=e.clientWidth+"px",t.style.display="";const{x:o,y:c}=t.getBoundingClientRect(),{x:a,y:d}=e.getBoundingClientRect();this.#treeselectInitPosition={containerX:a,containerY:d,listX:o,listY:c}}const{listX:o,listY:c,containerX:a,containerY:d}=this.#treeselectInitPosition;i=e.clientHeight;t.style.maxHeight=window.innerHeight-i+"px",r&&!s||(this.#transform.top=`translate(${a-o}px, ${d-c-l}px)`,this.#transform.bottom=`translate(${a-o}px, ${d+i-c}px)`),t.style.transform=n?this.#transform.top:this.#transform.bottom,this.#updateDirectionClasses(n,!0)}#emitInput(){this.srcElement.dispatchEvent(new CustomEvent("input",{detail:this.value}))}}export default Treeselect;