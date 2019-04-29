import router from 'umi/router';


export default {
  namespace:'other',
  state:{
    outHtml:'',
    outMp4:'',
  },
  effects:{
    *actionSaveHtml({html},{put}){
      yield put({
        type:'saveOutHtml',
        html:html
      })

      router.push({
        query:'html',
        pathname:'/link'
      });
    },
    *actionSaveMp4({mp4},{put}){

      yield put({
        type:'saveOutMp4',
        mp4:mp4
      })

      router.push({
        query:'mp4',
        pathname:'/link'
      });
    }
  },
  reducers:{
    saveOutHtml(state,action){
      return{
        ...state,
        outHtml : action.html
      }
    },
    saveOutMp4(state,action){
      return{
        ...state,
        outMp4 : action.mp4
      }
    }
  },
}
