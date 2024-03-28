import React, { useCallback, useEffect, useRef, useState } from 'react';
import './RegisterProgram.scss'
import company from "../../images/notice/company.jpg"
import Footer from '../../components/Footer';
import Title from '../../components/Title';
import { PiArrowElbowDownRightThin } from "react-icons/pi";
import axios from 'axios'
import MainURL from "../../MainURL";
import { useNavigate, useLocation } from 'react-router-dom';
import SubTitle from '../../components/SubTitle';
import { FaArrowLeft } from "react-icons/fa6";
import Loading from '../../components/Loading';

export default function RegisterProgram (props:any) {

  let navigate = useNavigate();
  const location = useLocation(); 
  const sort = location.state.sort;
  const [isLoading, setIsLoading] = useState<boolean>(false);

  interface songListProps {
    id : number,
    composition: string,
    songName : string,
    subSongName : string,
  }

  const [songList, setSongList] = useState<songListProps[]>([]);

  // 게시글 가져오기
  const fetchPosts = async () => {
    let res = await axios.get(`${MainURL}/datacontrol/getsongdata/${sort}`);
    if (res !== undefined ) {
      let copy = res.data;
      setSongList(copy);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);
  
  // 프로그램 입력 박스 -----------------------------------------------
  interface programProps {
    number: number;
    composition : string[],
    songName : string[],
    styleSelected : number
  }
 
  // 프로그램 입력 데이터
  const [programInputs, setProgramInputs] = useState<programProps[]>
  ([{number:1, composition:[""], songName:[""], styleSelected: 0},
    {number:2, composition:[""], songName:[""], styleSelected: 0}
  ])

  // 프로그램 박스 추가
   const addProgramInput = () => {
    setProgramInputs([...programInputs, { number: programInputs.length + 1, composition:[""], songName:[""], styleSelected:0}]);
  };
  // 프로그램 박스 삭제
  const removeProgramInput = (index: number) => {
    const inputs = [...programInputs];
    inputs.splice(index, 1);
    setProgramInputs(inputs);
  };

  // 프로그램 박스 스타일 변경 
  const handleStyleSelectedChange = (index: number, num: number ) => {
    const inputs = [...programInputs];
    inputs[index].styleSelected = num;
    setProgramInputs(inputs);
  };

  // 프로그램 박스 스타일 다시 선택 
  const handleStyleReSelectedChange = (index: number) => {
    const inputs = [...programInputs];
    inputs[index].composition = [""];
    inputs[index].songName = [""];
    inputs[index].styleSelected = 0;
    setProgramInputs(inputs);
  };

  // -----------------------------------------------------------------
  const [viewAutoCompleteComposition, setViewAutoCompleteComposition] = useState(Array(programInputs.length).fill(false));  
  const [dropDownListCompostion, setDropDownListCompostion] = useState<songListProps[]>([]);
  const [dropDownItemIndexCompostion, setDropDownItemIndexCompostion] = useState(-1);
  const [isComposingCompostion, setIsComposingCompostion] = useState(false);

  // 작곡가 내용 변경 
  const handleCompositionChange = (index: number, text: string, compositionIdx: number ) => {
    const inputs = [...programInputs];
    inputs[index].composition[compositionIdx] = text;
    const viewAutoComplete = [...viewAutoCompleteComposition];
    viewAutoComplete[index] = true;
    setDropDownItemIndexCompostion(-1);
    setViewAutoCompleteComposition(viewAutoComplete);
    handleAutoCompleteComposition(text);
    setProgramInputs(inputs);
  };

  // 자동완성  -----------------
  const handleAutoCompleteComposition = (text : string ) => {
    const copy = songList.filter((e: any) => e.composition.includes(text) === true);
    copy.sort((a, b) => (a.composition > b.composition) ? 1 : -1);
    setDropDownListCompostion(copy);
  }

  const handleDropDownKeyComposition = (event:any, index:number, subIndex:number) => {
    const inputs = [...programInputs];
    if (isComposingCompostion) return;
    if (viewAutoCompleteComposition) {
      if (event.key === 'ArrowDown' && dropDownItemIndexCompostion === -1) {
        setDropDownItemIndexCompostion(0)
      } else if (event.key === 'ArrowDown' && dropDownItemIndexCompostion >= 0 && dropDownItemIndexCompostion !== dropDownListCompostion.length - 1) {
        setDropDownItemIndexCompostion(dropDownItemIndexCompostion + 1)
      } else if (event.key === 'ArrowDown' && dropDownItemIndexCompostion === dropDownListCompostion.length - 1) {
        return
      } else if (event.key === 'ArrowUp' && dropDownItemIndexCompostion >= 0) {
        setDropDownItemIndexCompostion(dropDownItemIndexCompostion - 1)
      } else if (event.key === 'Enter' && dropDownItemIndexCompostion >= 0) {
        inputs[index].composition[subIndex] = dropDownListCompostion[dropDownItemIndexCompostion].composition;
        const viewAutoComplete = [...viewAutoCompleteComposition];
        viewAutoComplete[index] = false;
        setViewAutoCompleteComposition(viewAutoComplete);
        setDropDownItemIndexCompostion(-1)
      } else if (event.key === 'Enter' && dropDownItemIndexCompostion === -1) {
        const viewAutoComplete = [...viewAutoCompleteComposition];
        viewAutoComplete[index] = false;
        setViewAutoCompleteComposition(viewAutoComplete);
      }
    }
  }
 
  // 작곡가 입력란 추가
  const addCompositionInput = (programNum: number, compositionIndex: number) => {
    const inputs = [...programInputs];
    const inputData = programInputs.find((e)=> e.number === programNum);
    if (inputData) {
      inputData.composition[compositionIndex + 1] = "";
      setProgramInputs([...inputs]);
    }
  };
  // 작곡가 입력란 삭제
  const removeCompositionInput = (programNum: number, compositionIndex: number) => {
    const inputs = [...programInputs];
    const inputData = programInputs.find((e)=> e.number === programNum);
    if (inputData) {
      inputData?.composition.splice(compositionIndex, 1);
      setProgramInputs(inputs);
    }
  };
  // -----------------------------------------------------------------
  const [viewAutoCompleteSongName, setViewAutoCompleteSongName] = useState(Array(programInputs.length).fill(false));  
  const [dropDownListSongName, setDropDownListSongName] = useState<songListProps[]>([]);
  const [dropDownItemIndexSongName, setDropDownItemIndexSongName] = useState(-1);
  const [isComposingSongName, setIsComposingSongName] = useState(false);
  
  // 곡명 내용 변경 
  const handleSongNameChange = (index: number, text: string, songIdx: number ) => {
    const inputs = [...programInputs];
    inputs[index].songName[songIdx] = text;
    const viewAutoComplete = [...viewAutoCompleteSongName];
    viewAutoComplete[index] = true;
    setDropDownItemIndexSongName(-1);
    setViewAutoCompleteSongName(viewAutoComplete);
    handleAutoCompleteSongName(text);
    setProgramInputs(inputs);
  };
  
  // 자동완성  --------------
  const handleAutoCompleteSongName = (text : string ) => {
    const copy = songList.filter((e: any) => e.songName.includes(text) === true);
    copy.sort((a, b) => (a.songName > b.songName) ? 1 : -1);
    setDropDownListSongName(copy);
  }

  const handleDropDownKeySongName = (event:any, index:number, subIndex:number) => {
    const inputs = [...programInputs];
    if (isComposingSongName) return;
    if (viewAutoCompleteSongName) {
      if (event.key === 'ArrowDown' && dropDownItemIndexSongName === -1) {
        setDropDownItemIndexSongName(0)
      } else if (event.key === 'ArrowDown' && dropDownItemIndexSongName >= 0 && dropDownItemIndexSongName !== dropDownListSongName.length - 1) {
        setDropDownItemIndexSongName(dropDownItemIndexSongName + 1)
      } else if (event.key === 'ArrowDown' && dropDownItemIndexSongName === dropDownListSongName.length - 1) {
        return
      } else if (event.key === 'ArrowUp' && dropDownItemIndexSongName >= 0) {
        setDropDownItemIndexSongName(dropDownItemIndexSongName - 1)
      } else if (event.key === 'Enter' && dropDownItemIndexSongName >= 0) {
        inputs[index].songName[subIndex] = dropDownListSongName[dropDownItemIndexSongName].songName;
        const viewAutoComplete = [...viewAutoCompleteSongName];
        viewAutoComplete[index] = false;
        setViewAutoCompleteSongName(viewAutoComplete);
        setDropDownItemIndexSongName(-1)
      } else if (event.key === 'Enter' && dropDownItemIndexSongName === -1) {
        const viewAutoComplete = [...viewAutoCompleteSongName];
        viewAutoComplete[index] = false;
        setViewAutoCompleteSongName(viewAutoComplete);
      }
    }
  }
  // 곡명 입력란 추가
  const addSongNameInput = (programNum: number, songNameIndex: number) => {
    const inputs = [...programInputs];
    const inputData = programInputs.find((e)=> e.number === programNum);
    if (inputData) {
      inputData.songName[songNameIndex + 1] = "";
      setProgramInputs([...inputs]);
    }
  };
  // 곡명 입력란 삭제
  const removeSongNameInput = (programNum: number, songNameIndex: number) => {
    const inputs = [...programInputs];
    const inputData = programInputs.find((e)=> e.number === programNum);
    if (inputData) {
      inputData?.songName.splice(songNameIndex, 1);
      setProgramInputs(inputs);
    }
  };

  // -----------------------------------------------------------------
  // 소제목 입력 박스 
  interface SubProgramProps {
    programNumber: number;
    songName : string[]
  }

  // 소제목 입력 데이터
  const [subProgramInputs, setSubProgramInputs] = useState<SubProgramProps[]>([])
  // 소제목 내용 변경
  const handleSubProgramInputChange = (programNum: number, text: string, songNameIndex: number) => {
    const inputs = [...subProgramInputs];
    const inputData = inputs.find((e)=> e.programNumber === programNum);
    if (inputData) {
      inputData.songName[songNameIndex] = text;
      setSubProgramInputs([...inputs]);
    }
  };
  // 소제목 박스 생성
  const handleSubProgramAdd = (programNum: number) => {
    const inputs = [...subProgramInputs];
    setSubProgramInputs([...inputs, {programNumber: programNum, songName:[""]}]);
  };
  // 입력란 추가
  const addSubProgramInput = (programNum: number, songNameIndex: number) => {
    const inputs = [...subProgramInputs];
    const inputData = inputs.find((e)=> e.programNumber === programNum);
    if (inputData) {
      inputData.songName[songNameIndex + 1] = "";
      setSubProgramInputs([...inputs]);
    }
  };
  // 입력란 삭제
  const removeSubProgramInput = (programNum: number, songNameIndex: number) => {
    const inputs = [...subProgramInputs];
    const inputData = inputs.find((e)=> e.programNumber === programNum);
    if (inputData) {
      inputData?.songName.splice(songNameIndex, 1);
      setSubProgramInputs(inputs);
    }
  };

  // -----------------------------------------------------------------
  // 곡설명 입력 박스 
  interface NoticeProps {
    programNumber: number;
    notice : [{songNum : number, content: string, view: boolean}]
  }

  // 곡설명 입력 데이터
  const [noticeInputs, setNoticeInputs] = useState<NoticeProps[]>([])

  // 곡설명 박스 초기 생성
  const handleNoticeCreate = (programNum: number) => {
    const inputs = [...noticeInputs];
    setNoticeInputs([...inputs, {programNumber : programNum, notice : [{songNum : inputs.length + 1, content: "", view: false}]}]);
  };

  // 곡설명 박스 추가
  const handleNoticeAdd = (programNum: number, songIdx: number) => {
    const inputs = [...noticeInputs];
    const inputData = inputs.find((e)=> e.programNumber === programNum);
    if (inputData) {
      inputData.notice[songIdx + 1] = {songNum : songIdx + 2, content: "", view: false};
      setNoticeInputs(inputs);
    }
  };
  // 곡설명 박스 삭제
  const handleNoticeDelete = (programNum: number, songIdx: number) => {
    const inputs = [...noticeInputs];
    const inputData = inputs.find((e)=> e.programNumber === programNum);
    if (inputData) {
      inputData.notice.splice(songIdx, 1);
      setNoticeInputs(inputs);
    }
  };

  // 입력란 보이기
  const handleNoticeViewChange = (programNum: number, songIdx: number) => {
    const inputs = [...noticeInputs];
    const inputData = inputs.find((e)=> e.programNumber === programNum);
    const inputDataCopy = inputData?.notice.find((e)=> e.songNum === songIdx + 1);
    if (inputDataCopy) {
      inputDataCopy.view = true;
    }
    setNoticeInputs(inputs);
  };
  // 입력란 제거하기
  const handleNoticeViewDelete = (programNum: number, songIdx: number) => {
    const inputs = [...noticeInputs];
    const inputData = inputs.find((e)=> e.programNumber === programNum);
    const inputDataCopy = inputData?.notice.find((e)=> e.songNum === songIdx + 1);
    if (inputDataCopy) {
      inputDataCopy.view = false;
    }
    setNoticeInputs(inputs);
  };

  // 곡설명 내용 변경
  const handleNoticeInputChange = (programNum: number, text: string, noticeIndex: number) => {
    const inputs = [...noticeInputs];
    const inputData = inputs.find((e)=> e.programNumber === programNum);
    if (inputData) {
      // inputData.notice[noticeIndex] = text;
      setNoticeInputs([...inputs]);
    }
  };

  // -----------------------------------------------------------------
  // 가사 입력 박스 
   interface LyricsProps {
    programNumber: number;
    lyrics : [{songNum : number, content: string, view: boolean}]
  }

  // 가사 입력 데이터
  const [lyricsInputs, setLyricsInputs] = useState<LyricsProps[]>([])

  // 가사 박스 초기 생성
  const handleLyricsCreate = (programNum: number) => {
    const inputs = [...lyricsInputs];
    setLyricsInputs([...inputs, {programNumber : programNum, lyrics : [{songNum : inputs.length + 1, content: "", view: false}]}]);
  };

  // 곡설명 박스 추가
  const handleLyricsAdd = (programNum: number, songIdx: number) => {
    const inputs = [...lyricsInputs];
    const inputData = inputs.find((e)=> e.programNumber === programNum);
    if (inputData) {
      inputData.lyrics[songIdx + 1] = {songNum : songIdx + 2, content: "", view: false};
      setLyricsInputs(inputs);
    }
  };
  // 가사 박스 삭제
  const handleLyricsDelete = (programNum: number, songIdx: number) => {
    const inputs = [...lyricsInputs];
    const inputData = inputs.find((e)=> e.programNumber === programNum);
    if (inputData) {
      inputData.lyrics.splice(songIdx, 1);
      setLyricsInputs(inputs);
    }
  };

  // 가사 보이기
  const handleLyricsViewChange = (programNum: number, songIdx: number) => {
    const inputs = [...lyricsInputs];
    const inputData = inputs.find((e)=> e.programNumber === programNum);
    const inputDataCopy = inputData?.lyrics.find((e)=> e.songNum === songIdx + 1);
    if (inputDataCopy) {
      inputDataCopy.view = true;
    }
    setLyricsInputs(inputs);
  };
  // 가사 제거하기
  const handleLyricsViewDelete = (programNum: number, songIdx: number) => {
    const inputs = [...lyricsInputs];
    const inputData = inputs.find((e)=> e.programNumber === programNum);
    const inputDataCopy = inputData?.lyrics.find((e)=> e.songNum === songIdx + 1);
    if (inputDataCopy) {
      inputDataCopy.view = false;
    }
    setLyricsInputs(inputs);
  };

  // 가사 내용 변경
  const handleLyricsInputChange = (programNum: number, text: string, lyricsIndex: number) => {
    const inputs = [...lyricsInputs];
    const inputData = inputs.find((e)=> e.programNumber === programNum);
    if (inputData) {
      // inputData.lyrics[lyricsIndex] = text;
      setLyricsInputs([...inputs]);
    }
  };

  // -----------------------------------------------------------------
  
  // InterMission
  const handleInterMissionInsert = (index: number) => {
    const inputs = [...programInputs];
    inputs[index].composition[0] = 'InterMission';
    inputs[index].songName[0] = 'InterMission';
    setProgramInputs(inputs);
  };
  // -----------------------------------------------------------------

  // 프로그램 팜플렛 등록
  const registerProgram = async () => {
    await setIsLoading(true);
    axios 
      .post(`${MainURL}/pamphlets/postprogram`, {
        userAccount : 'johnleedev@naver.com', userName: '이요한',
        pamphletID : location.state.pamphletID,
        sort : location.state.sort,
        program : JSON.stringify(programInputs),
        subProgram : JSON.stringify(subProgramInputs),
        notice : JSON.stringify(noticeInputs),
        lyrics : JSON.stringify(lyricsInputs),
      })
      .then((res) => {
        if (res.data === true) {
          alert('입력되었습니다.');
          navigate('/registerplayer', {state : { pamphletID : location.state.pamphletID, part : location.state.part, sort : location.state.sort }});
        } else {
          alert(res.data);
        }
      })
      .catch(() => {
        console.log('실패함')
      })
  };

  return isLoading
    ? (
    <div style={{flex:1, width:'100%', height:'80vh'}}>
      <Loading /> 
    </div>
    ) : (
    <div className="apply">

      <div className="topimage">
        <img src={company} alt='company'/>
      </div>

      <div className="inner">

        <Title name={'등록하기'}/>

        <SubTitle name='STEP 2.'/>


        {programInputs?.map((item, index)=>{

          const subData = subProgramInputs.find((e)=> e.programNumber === item.number);
          const noticeData = noticeInputs.find((e)=> e.programNumber === item.number);
          const lyricsData = lyricsInputs.find((e)=> e.programNumber === item.number);

          return (
            <div key={index}>
              
              <div className='registerProgramContainer'>
                <div className="registerNumber">
                  <h3>{item.number}</h3>
                </div>
                {
                  item.styleSelected < 1
                  ?
                  <ul className="registerProgram-StyleSelect">
                    <li className={`styleSelectBox ${item.styleSelected === 1 && 'selected'}`} onClick={()=>{
                      handleStyleSelectedChange(index, 1)
                      handleNoticeCreate(item.number);
                      handleLyricsCreate(item.number);
                    }}>A-Type 작곡가, 곡명</li>
                    <li className={`styleSelectBox ${item.styleSelected === 2 && 'selected'}`} onClick={()=>{
                      handleStyleSelectedChange(index, 2)
                      handleNoticeCreate(item.number);
                      handleLyricsCreate(item.number);
                    }}>B-Type 작곡가, 곡명1,2,3</li>
                    <li className={`styleSelectBox ${item.styleSelected === 3 && 'selected'}`} onClick={()=>{
                      handleStyleSelectedChange(index, 3);
                      handleSubProgramAdd(item.number);
                      handleNoticeCreate(item.number);
                      handleLyricsCreate(item.number);
                    }}>C-Type 작곡가, 소품제목, 곡명</li>
                    <li className={`styleSelectBox ${item.styleSelected === 4 && 'selected'}`} onClick={()=>{
                      handleStyleSelectedChange(index, 4)
                      handleNoticeCreate(item.number);
                      handleLyricsCreate(item.number);
                    }}>D-Type 작곡가1,2,3, 곡명</li>
                    <li className={`styleSelectBox ${item.styleSelected === 5 && 'selected'}`} onClick={()=>{
                      handleStyleSelectedChange(index, 5);
                      handleInterMissionInsert(index);
                      handleNoticeCreate(item.number);
                      handleLyricsCreate(item.number);
                    }}>E-Type InterMission</li>
                  </ul>

                  :

                  <div className='registerProgram-Content'>

                    <div className="divider"></div>
                    {
                      item.styleSelected === 5
                      ?
                      <div className="register content">
                        <div className='backBtn' onClick={()=>{handleStyleReSelectedChange(index)}}><FaArrowLeft /></div>
                        <div className="intermission">INTERMISSION</div>
                      </div>
                      :
                      <div className="register content">
                        <div className='backBtn' onClick={()=>{handleStyleReSelectedChange(index)}}><FaArrowLeft /></div>
                        {/* 작곡가 ------------------------------------------------------------------------------- */}
                        {
                          item.composition.map((compositions:any, compositionIndex:any)=>{
                            return (
                              <div className='inputbox'>
                                <div className='name'>
                                  {
                                    item.styleSelected === 4
                                    ?
                                    <p>작곡가{ compositionIndex +1 }</p>
                                    :
                                    <p>작곡가</p>
                                  }
                                </div>
                                <input type="text" 
                                  value={compositions}
                                  onChange={(e) => handleCompositionChange(index, e.target.value, compositionIndex)}
                                  onBlur={()=>{
                                    const viewAutoComplete = [...viewAutoCompleteComposition];
                                    viewAutoComplete[index] = false;
                                    setViewAutoCompleteComposition(viewAutoComplete);
                                  }}
                                  onKeyDown={(e)=>{handleDropDownKeyComposition(e, index, compositionIndex)}}
                                  onCompositionStart={() => setIsComposingCompostion(true)}
                                  onCompositionEnd={() => setIsComposingCompostion(false)}
                                />
                                { item.composition[compositionIndex] !== '' && viewAutoCompleteComposition[index] && dropDownListCompostion.length > 0 &&
                                  <div className="autoComplete">
                                    <div className='dropDownList' style={{fontSize:10}}>(아래 화살표를 눌러서 선택하세요)</div>
                                    { 
                                      dropDownListCompostion.slice(0, 10).map((item:any, index:any)=>{
                                        return(
                                          <div key={index} className={dropDownItemIndexCompostion === index ? 'dropDownList selected' : 'dropDownList'}>{item.composition}</div>
                                        )
                                      })
                                    }
                                  </div>  
                                }     
                                {
                                  item.styleSelected === 4 &&
                                  <>
                                    { compositionIndex === item.composition.length - 1 ? (
                                      <div className='song-plus-minus-button'
                                        onClick={()=> addCompositionInput(item.number, compositionIndex)}
                                      ><p>+</p></div>
                                    ) : (
                                      <div className='song-plus-minus-button'
                                        onClick={() => removeCompositionInput(item.number, compositionIndex)}
                                      ><p>-</p></div>
                                    )}
                                  </>
                                }
                              </div>
                            )
                          })
                        }
                        {/* 곡명 ------------------------------------------------------------------------------- */}
                        {
                          item.songName.map((songs:any, songIndex:any)=>{

                            const noticeDataCopy = noticeData?.notice.find((e)=> e.songNum === songIndex+1);
                            const lyricsDataCopy = lyricsData?.lyrics.find((e)=> e.songNum === songIndex+1);

                            return(
                              <div key={songIndex}>
                                <div className='inputbox'>
                                  <div className='name'>
                                    { item.styleSelected === 3 ? <p>소품제목</p> : <p>곡명</p>}
                                  </div>
                                  <input type="text" 
                                    value={songs}
                                    onChange={(e) => handleSongNameChange(index, e.target.value, songIndex)}
                                    onBlur={()=>{
                                      const viewAutoComplete = [...viewAutoCompleteSongName];
                                      viewAutoComplete[index] = false;
                                      setViewAutoCompleteSongName(viewAutoComplete);
                                    }}
                                    onKeyDown={(e)=>{handleDropDownKeySongName(e, index, songIndex)}}
                                    onCompositionStart={() => setIsComposingSongName(true)}
                                    onCompositionEnd={() => setIsComposingSongName(false)}
                                  />
                                  { item.songName[songIndex] !== '' && viewAutoCompleteSongName[index] && dropDownListSongName.length > 0 &&
                                    <div className="autoComplete">
                                      <div className='dropDownList' style={{fontSize:10}}>(아래 화살표를 눌러서 선택하세요)</div>
                                      { 
                                        dropDownListSongName.slice(0, 10).map((item:any, index:any)=>{
                                          return(
                                            <div key={index} className={dropDownItemIndexSongName === index ? 'dropDownList selected' : 'dropDownList'}>{item.songName}</div>
                                          )
                                        })
                                      }
                                    </div>  
                                  }
                                  {
                                    item.styleSelected === 2 &&
                                    <>
                                      { songIndex === item.songName.length - 1 ? (
                                        <>
                                        <div className='song-plus-minus-button'
                                          onClick={()=> {
                                            addSongNameInput(item.number, songIndex);
                                            handleNoticeAdd(item.number, songIndex);
                                            handleLyricsAdd(item.number, songIndex);
                                          }}
                                        ><p>+</p></div>
                                        <div className='song-plus-minus-button'
                                          onClick={() => {
                                            removeSongNameInput(item.number, songIndex)
                                            handleNoticeDelete(item.number, songIndex);
                                            handleLyricsDelete(item.number, songIndex);
                                          }}
                                        ><p>-</p></div>
                                        </>
                                      ) : (
                                        <div className='song-plus-minus-button'
                                          onClick={() => {
                                            removeSongNameInput(item.number, songIndex)
                                            handleNoticeDelete(item.number, songIndex);
                                            handleLyricsDelete(item.number, songIndex);
                                          }}
                                        ><p>-</p></div>
                                      )}
                                    </>
                                  }
                                </div>
                                {/* 곡설명 ------------------------------------------------------------------------------- */}
                                {
                                  noticeDataCopy?.view
                                  ?
                                  <div className="register notice">
                                    <div className='inputbox'>
                                      <div className='name'>
                                        <PiArrowElbowDownRightThin/>
                                        <h4>곡설명</h4>
                                        <p className='notice-x'
                                          onClick={()=>{handleNoticeViewDelete(item.number, songIndex)}}
                                        >x</p>
                                      </div>
                                      <textarea
                                        onChange={(e) => handleNoticeInputChange(item.number, e.target.value, songIndex)}
                                      />
                                    </div>
                                  </div>
                                  :
                                  <div className="register notice">
                                    <div className='inputbox notice'>
                                      <div className='name'>
                                      </div>
                                      <div className='button'
                                        onClick={()=>{handleNoticeViewChange(item.number, songIndex)}}
                                      >
                                        <h4>곡설명 입력하기</h4>
                                        <p>(선택)</p>
                                      </div>
                                    </div>
                                  </div>
                                }
                                {/* 가사 ------------------------------------------------------------------------------- */}
                                {
                                  sort === 'Vocal' &&
                                  <>
                                  {
                                    lyricsDataCopy?.view
                                    ?
                                    <div className="register notice">
                                      <div className='inputbox'>
                                        <div className='name'>
                                          <PiArrowElbowDownRightThin/>
                                          <h4>가사</h4>
                                          <p className='notice-x'
                                            onClick={()=>{handleLyricsViewDelete(item.number, songIndex)}}
                                          >x</p>
                                        </div>
                                        <textarea
                                          onChange={(e) => handleLyricsInputChange(item.number, e.target.value, songIndex)}
                                        />
                                      </div>
                                    </div>
                                    :
                                    <div className="register notice">
                                      <div className='inputbox notice'>
                                        <div className='name'>
                                        </div>
                                        <div className='button'
                                          onClick={()=>{handleLyricsViewChange(item.number, songIndex)}}
                                        >
                                          <h4>가사 입력하기</h4>
                                          <p>(선택)</p>
                                        </div>
                                      </div>
                                    </div>
                                  }
                                  </>
                                }
                              </div>
                            )
                          })
                        }
                        {/* 소제목 ------------------------------------------------------------------------------- */}
                        {
                          item.styleSelected === 3 &&
                          <div className="register subContent">
                            {
                              subData?.songName?.map((subItem, subIndex) => (
                                <div key={subIndex} className='inputbox'>
                                  <div className='name1'>
                                    <PiArrowElbowDownRightThin/>
                                  </div>
                                  <div className='name2'>
                                    <p>곡명{subIndex + 1}</p>
                                  </div>
                                  <input
                                    value={subItem}
                                    onChange={(e) => handleSubProgramInputChange(item.number, e.target.value, subIndex)}
                                  />
                                  { subIndex === subData.songName.length - 1 ? (
                                    <div className='plus-minus-button'
                                      onClick={()=> addSubProgramInput(item.number, subIndex)}
                                    ><p>+</p></div>
                                  ) : (
                                    <div className='plus-minus-button'
                                      onClick={() => removeSubProgramInput(item.number, subIndex)}
                                    ><p>-</p></div>
                                  )}
                                </div>
                              ))
                            }
                          </div>
                        }
                        
                      </div>
                    }
                  </div>
                }
              </div>

              {index === programInputs.length - 1 ? (
                <div style={{ display:'flex'}}>
                  <div className='plus-minus-button'
                    onClick={addProgramInput}
                  ><p>+</p></div>
                  <div className='plus-minus-button'
                    onClick={() => removeProgramInput(index)}
                  ><p>-</p></div>
                </div>
              ) : (
                <div className='plus-minus-button'
                  onClick={() => removeProgramInput(index)}
                ><p>-</p></div>
              )}
            </div>
          )
        })}
        
     
        <div className="buttonbox">
          <div className="button" onClick={()=>{
            navigate('/registerdefault'); 
          }}>
            <p>이전</p>
          </div>
          <div className="button" onClick={registerProgram}>
            <p>다음</p>
          </div>
        </div>    
        
      </div>

      <Footer/>
    </div>
  );
}
