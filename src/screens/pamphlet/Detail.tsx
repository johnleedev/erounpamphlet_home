import React, { useEffect, useState } from 'react';
import company from "../../images/notice/company.jpg"
import './Detail.scss'
import Title from '../../components/Title';
import Footer from '../../components/Footer';
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import MainURL from "../../MainURL";
import Loading from '../../components/Loading';
import { BsInfoLg } from "react-icons/bs";
import { IoText } from "react-icons/io5";

interface PostProps {
  id : number,
  location: string,
  title : string,
  date : string,
  time : string,
  place : string
  address : string,
  imageName : string,
  quiry: string,
  superViser: string,
  opener: string,
  supporter: string,
  ticket: string,
  ticketReserve: string,
}

interface ProgramProps {
  number : number,
  composition: string[],
  songName: string[],
}

interface SubProgramProps {
  programNumber : number,
  songName : string[]
}
interface NoticeProps {
  programNumber : number,
  notice : string
}
interface LyricsProps {
  programNumber : number,
  lyrics : string
}

interface ProfileProps {
  pamphletID : number,
  playerName : string,
  part : string,
  imageName : string,
  career : string,
  isStyleWrite: string
}

export default function Detail (props:any) {

  const location = useLocation(); 

  const fetchPosts = async () => {
    const post = await axios.get(`${MainURL}/pamphlets/posts/${location.state.id}`)
    if (post.data) {
      let copy : PostProps = post.data[0];
      setPostData(copy);
    }
    const program = await axios.get(`${MainURL}/pamphlets/program/${location.state.id}`)
    if (program.data) {
      let copy = program.data[0];
      const programData = JSON.parse(copy.program);
      setProgramData(programData);
      const subProgramData = JSON.parse(copy.subProgram);
      setSubProgramData(subProgramData);
      const noticeData = copy.notice ? JSON.parse(copy.notice) : [];
      setNoticeData(noticeData);
      setIsNoticeView(Array(noticeData.length).fill(false));
      const lyricsData = copy.lyrics ? JSON.parse(copy.lyrics) : [];
      setLyricsData(lyricsData);
      setIsNoticeView(Array(lyricsData.length).fill(false));
    }
    const profile = await axios.get(`${MainURL}/pamphlets/profiles/${location.state.id}`)
    if (profile.data) {
      let copy : ProfileProps[] = profile.data;
      copy.reverse();
      setProfileData(copy);
    }
  };
   
  useEffect(() => {
    fetchPosts();
  }, []);

  let [postData, setPostData] = useState<PostProps>();
  let [programData, setProgramData] = useState<ProgramProps[]>([]);
  let [subProgramData, setSubProgramData] = useState<SubProgramProps[]>([]);
  let [noticeData, setNoticeData] = useState<NoticeProps[]>([]);
  let [lyricsData, setLyricsData] = useState<LyricsProps[]>([]);
  let [profileData, setProfileData] = useState<ProfileProps[]>([]);

  const posterImageURL = `${MainURL}/images/pamphlet_default/${postData?.imageName}`
  const [isNoticeView, setIsNoticeView] = useState<boolean[]>([]);
  const [isLyricsView, setIsLyricsView] = useState<boolean[]>([]);

  const noticeBtnSelection = (index : any, isBoolean: boolean) => {
    const selection = [...isNoticeView];
    selection[index] = isBoolean;
    setIsNoticeView(selection);
  };

  const lyricsBtnSelection = (index : any, isBoolean: boolean) => {
    const selection = [...isLyricsView];
    selection[index] = isBoolean;
    setIsLyricsView(selection);
  };
  
  return  postData === undefined || programData.length === 0 
  // postData === undefined || programData.length === 0 || profileData.length === 0
    ? (
    <div style={{flex:1, width:'100%', height:'80vh'}}>
      <Loading /> 
    </div>
    ) : (
    <div className='soloDetail'>

      <div className="topimage">
        <img src={company} alt='company'/>
      </div>

      <div className="inner">
        
        <Title name={'독창회&독주회'}/>

        <div className='noticebox'>
          <div className='notice-title'>{postData?.title}</div>
          <div className='noticebox-sub'>
            <div className="noticebox-sub-left">
              <div className="notice-image">
                <img src={posterImageURL} alt='postermain'/>
              </div>
            </div>
            <ul className="noticebox-sub-right">
              <li className="notice-list"><p>지역</p><p className='content'>{postData?.location}</p></li>
              <li className="notice-list"><p>날짜</p><p className='content'>{postData?.date}</p></li>
              <li className="notice-list"><p>시간</p><p className='content'>{postData?.time}</p></li>
              <li className="notice-list"><p>장소</p><p className='content'>{postData?.place}</p></li>
              <li className="notice-list"><p>주관</p><p className='content'>{postData?.superViser}</p></li>
              <li className="notice-list"><p>주최</p><p className='content'>{postData?.opener}</p></li>
              <li className="notice-list"><p>후원</p><p className='content'>{postData?.supporter}</p></li>
              <li className="notice-list"><p>티켓</p><p className='content'>{postData?.ticket}</p></li>
              <li className="notice-list"><p>티켓예매</p><p className='content'>{postData?.ticketReserve}</p></li>
              <li className="notice-list"><p>문의</p><p className='content'>{postData?.quiry}</p></li>
            </ul>
          </div>
        </div>

        <div className="programbox">
          <div className="program-title">Program</div>
          <ul className="program-cover">
            {
              programData.map((item:any, index:any)=>{
                const subProgramCopy = subProgramData.find((e)=> e.programNumber === item.number);
                const noticeCopy = noticeData.length > 0 ? noticeData.find((e)=> e.programNumber === item.number) : undefined;
                const lyricsCopy = lyricsData.length > 0 ? lyricsData.find((e)=> e.programNumber === item.number) : undefined;

                return (
                  <li className="program-list" key={item.number}>
                    {
                      item.composition.map((compositionItem:any, compositionIndex:any)=>{
                        return (
                          <>
                           {
                            compositionItem === 'InterMission' 
                            ?
                            null
                            :
                            <p className="program-composition" key={compositionIndex}>{compositionItem}</p>
                           }
                          </>
                        )
                      })
                    }
                    {
                      item.songName.map((subItem:any, subIndex:any)=>{
                        return(
                          <>
                            {
                              subItem === 'InterMission' 
                              ?
                              <p className="InterMission" key={subIndex}>
                              - InterMission -
                              </p>
                              :
                              <div className="program-songname-box">
                                <p className="program-songname" key={subIndex}>{subItem}</p>
                                <div className="program-notice-lyrics-box">
                                  {
                                    noticeCopy && 
                                    <>
                                      <div className="program-notice-lyrics-btn"
                                        // onClick={()=>{noticeBtnSelection(index)}}
                                        onMouseOver={()=>{noticeBtnSelection(index, true)}}
                                        onMouseLeave={()=>{noticeBtnSelection(index, false)}}
                                      >
                                        <p><BsInfoLg /></p>
                                      </div>
                                      {
                                        isNoticeView[index] && 
                                        <div className="Contentbox"
                                          onMouseOver={()=>{noticeBtnSelection(index, true)}}
                                          onMouseLeave={()=>{noticeBtnSelection(index, false)}}
                                        >{noticeCopy.notice}</div>
                                      }
                                    </>
                                  }
                                  {
                                    lyricsCopy &&
                                    <>
                                      <div className="program-notice-lyrics-btn"
                                        // onClick={()=>{lyricsBtnSelection(index)}}
                                        onMouseOver={()=>{lyricsBtnSelection(index, true)}}
                                        onMouseLeave={()=>{lyricsBtnSelection(index, false)}}
                                      >
                                        <p><IoText /></p>
                                      </div>
                                      {
                                        isLyricsView[index] && 
                                        <div className="Contentbox"
                                          onMouseOver={()=>{lyricsBtnSelection(index, true)}}
                                          onMouseLeave={()=>{lyricsBtnSelection(index, false)}}
                                        >{lyricsCopy.lyrics}</div>
                                      }
                                    </>
                                  }
                                </div>
                              </div>
                            }
                            {
                              subProgramCopy
                              ?
                              <>
                                {
                                  subProgramCopy.songName.map((song:any, songIdx:any)=>{
                                    return (
                                      <p className="program-subsongname" key={songIdx}>{songIdx+1}. {song}</p>
                                    )
                                  })
                                }
                              </>
                              :
                              null
                            }
                          </>
                        )
                      })
                    }
                  </li>
                )
              })
            }
          </ul>
        </div>
        
        <div className="careerbox">
          <div className="career-title">Profile</div>
          {
            profileData?.map((item:any, index:any)=>{
              const profileImageURL = `${MainURL}/images/pamphlet_player/${item.imageName}`
              const careerCopy = item.isStyleWrite === "true" ? item.career : JSON.parse(item.career);
              return (
                <div className="career-container" key={item.id}>
                  <div className="career-player">
                    <p className="career-part">{item.part}</p>
                    <p className="career-name">{item.playerName}</p>
                  </div>
                  <div className="career-content">
                    {
                      item.imageName !== 'undefined' &&
                      <div className="career-image">
                        <img src={profileImageURL} alt='profileImage'/>
                      </div>
                    }
                    <ul className="career-listcover">
                      {
                        item.isStyleWrite === "true"
                        ?
                        <div className="career-writting">
                          {careerCopy}
                        </div>
                        :
                        careerCopy.map((item:any, index:any)=>{
                          return(
                            <li className="career-list">
                              {item}
                            </li>
                          )
                        })
                      }
                    </ul>
                  </div>
                </div>
              )
            })
          }
        </div>

        

      </div>
       
      <Footer/>
    </div>
  );
}