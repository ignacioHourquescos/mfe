import React from 'react';
import ReactDOM from 'react-dom';
import App from './App'
import {createMemoryHistory, createBrowserHistory} from 'history'

//Mount function to start up the app
const  mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath}) =>{
   const history = defaultHistory || createMemoryHistory({
      initialEntries: [initialPath]
   });

   if(onNavigate){ 
      history.listen(onNavigate);
   }

   ReactDOM.render(<App onSignIn={onSignIn} history={history}/>,el)

   return{
      onParentNavigate({pathname: nextPathname}){
         const {pathname} = history.location;

         if(pathname !== nextPathname){
            history.push(nextPathname)
         }

      }
   }
}

//If we are in development and in isolation
//call mount inmediately
if(process.env.NODE_ENV === 'development'){
   const devRoot = document.querySelector('#_auth-dev-root');

   if(devRoot){
      mount(devRoot, {defaultHistory: createBrowserHistory()});
   }

}

// we are running through container
// and we should export the moun function

export {mount};