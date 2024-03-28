import React, { useCallback, useEffect, useRef, useState } from 'react';
import './RegisterDefault.scss'
import company from "../../images/notice/company.jpg"
import logo from "../../images/logo-white.png"
import Footer from '../../components/Footer';
import Title from '../../components/Title';
import { useDropzone } from 'react-dropzone'
import imageCompression from "browser-image-compression";
import axios from 'axios'
import MainURL from "../../MainURL";
import { useLocation, useNavigate } from 'react-router-dom';
import SubTitle from '../../components/SubTitle';
import Select from 'react-select';
import DatePicker from "react-datepicker";
import  "react-datepicker/dist/react-datepicker.css" ;
import { ko } from "date-fns/esm/locale";
import { format } from "date-fns";
import { SwatchesPicker} from 'react-color';
import html2canvas from 'html2canvas';
import { FaArrowLeft } from "react-icons/fa6";
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoIosArrowRoundUp } from "react-icons/io";
import { SlMagnifier } from "react-icons/sl";
import DaumPostcode from 'react-daum-postcode';
import Loading from '../../components/Loading';

export default function RegisterDefault(props:any) {

  let navigate = useNavigate();
  const useLocationCopy = useLocation();
  
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const dateCopy = new Date();
  const yearCopy = dateCopy.getFullYear();
  const monthOrigin = dateCopy.getMonth() + 1;
  const monthCopy = monthOrigin < 10 ? `0${monthOrigin}` : monthOrigin;
  const dayOrigin = dateCopy.getDate();
  const dayCopy = dayOrigin < 10 ? `0${dayOrigin}` : dayOrigin;
  const formatToday = `${yearCopy}${monthCopy}${dayCopy}`;
  
  // -------------------------------------------------------
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [title, setTitle] = useState('');
  const [sort, setSort] = useState('Orchestral');
  const [selectSort, setSelectSort] = useState(1);
  const [part, setPart] = useState('');
  const [nameEn, setNameEn] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const [dateOrigin, setDateOrigin] = useState('');
  const [time, setTime] = useState('PM 7:30');
  const [place, setPlace] = useState('');
  const [address, setAddress] = useState('');
  const [superViser, setSuperViser] = useState('');
  const [supporter, setSupporter] = useState('');
  const [ticket, setTicket] = useState('');
  const [ticketReserve, setTicketReserve] = useState('');
  const [quiry, setQuiry] = useState('');  

  // 구분 선택 ----------------------------------------------
  const sortOptions = [
    { value: 'Orchestral', label: '관현악' },
    { value: 'Vocal', label: '성악' },
    { value: 'Piano', label: '피아노' }
  ];

  // 파트 선택 ----------------------------------------------
  const partOptionsOrchestral = [
    { value: 'VIOLIN', label: 'Violin'},
    { value: 'VIOLA', label: 'Viola'},
    { value: 'CELLO', label: 'Cello'}, 
    { value: 'D.BASS', label: 'D.BASS'}, 
    { value: 'FLUTE', label: 'Flute'}, 
    { value: 'CLARINET', label: 'Clarinet'}, 
    { value: 'OBOE', label: 'Oboe'}, 
    { value: 'BASSOON', label: 'Bassoon'}, 
    { value: 'HORN', label: 'Horn'}, 
    { value: 'TRUMPET', label: 'Trumpet'}, 
    { value: 'TROMBONE', label: 'Trombone'}, 
    { value: 'TUBA', label: 'Tuba'}, 
    { value: 'HARP', label: 'Harp'}, 
    { value: 'PERCUSSION', label: 'Percussion'}
  ];

  const partOptionsVocal = [
    { value: 'SOPRANO', label: 'Soprano' },
    { value: 'MEZZO SOPRANO', label: 'Mezzo Soprano' },
    { value: 'TENOR', label: 'Tenor' },
    { value: 'BARITONE', label: 'Baritone' },
    { value: 'BASS', label: 'Bass' },
  ];

  // const partOptionsKorean = [
  //   { value: 'koreanVocal', label: '판소리' },
  //   { value: 'gayagem', label: '가야금' },
  //   { value: 'gumungo', label: '거문고' },
  //   { value: 'haegem', label: '해금' },
  //   { value: 'daegem', label: '대금' },
  //   { value: 'piri', label: '피리' },
  //   { value: 'ajaeng', label: '아쟁' },
  //   { value: 'koreanComposition', label: '작곡' }
  // ];

  // const partOptionsPractical = [
  //   { value: '', label: '보컬' },
  //   { value: '', label: '건반' },
  //   { value: '', label: '기타' },
  //   { value: '', label: '드럼' },
  // ];


  const [selectedPartOption, setSelectedPartOption] = useState({ value: '선택', label: '선택' });
  const handleSelectPartChange = ( event : any) => {
   setSelectedPartOption(event);
   setPart(event.value);
  }


  // 지역 선택 ----------------------------------------------
  const locationOptions = [
    { value: '선택', label: '선택' },
    { value: '서울', label: '서울' },
    { value: '인천/경기', label: '인천/경기' },
    { value: '대전/세종/충청', label: '대전/세종/충청' },
    { value: '광주/전라', label: '광주/전라' },
    { value: '대구/경북', label: '대구/경북' },
    { value: '부산/경남', label: '부산/경남' },
  ];

  const [selectedLocationOption, setSelectedLocationOption] = useState(locationOptions[0]);
  const handleSelectLocationChange = ( event : any) => {
   setSelectedLocationOption(event);
   setLocation(event.label);
  }

  // 날짜 선택 ----------------------------------------------
  const [startDate, setStartDate] = useState();
  const handleSelectDateChange = ( event : any) => {
    setStartDate(event);
    const day = format(event, 'EEE', { locale: ko });
    const copy = event.toLocaleDateString('ko-KR');
    const splitCopy = copy.split('. ');
    const thirdText = splitCopy[2].slice(0, -1);
    const reformmedTextko = `${splitCopy[0]}년 ${splitCopy[1]}월 ${thirdText}일 (${day})`
    const splitCopy2Copy = splitCopy[1] < 10 ? `0${splitCopy[1]}` : splitCopy[1];
    const splitCopy3Copy = splitCopy[2] < 10 ? `0${splitCopy[2]}` : splitCopy[2];
    const reformmedText = `${splitCopy[0]}.${splitCopy2Copy}.${splitCopy3Copy}`;
    setDate(reformmedTextko);
    setDateOrigin(reformmedText);
  }

  // 시간 선택 ----------------------------------------------
  const timeOptions = [
    { value: '선택', label: '선택' },
    { value: 'AM 10:00', label: 'AM 10:00' },
    { value: 'AM 10:30', label: 'AM 10:30' },
    { value: 'AM 11:00', label: 'AM 11:00' },
    { value: 'AM 11:30', label: 'AM 11:30' },
    { value: 'PM 12:00', label: 'PM 12:00' },
    { value: 'PM 12:30', label: 'PM 12:30' },
    { value: 'PM 1:00', label: 'PM 1:00' },
    { value: 'PM 1:30', label: 'PM 1:30' },
    { value: 'PM 2:00', label: 'PM 2:00' },
    { value: 'PM 2:30', label: 'PM 2:30' },
    { value: 'PM 3:00', label: 'PM 3:00' },
    { value: 'PM 3:30', label: 'PM 3:30' },
    { value: 'PM 4:00', label: 'PM 4:00' },
    { value: 'PM 4:30', label: 'PM 4:30' },
    { value: 'PM 5:00', label: 'PM 5:00' },
    { value: 'PM 5:30', label: 'PM 5:30' },
    { value: 'PM 6:00', label: 'PM 6:00' },
    { value: 'PM 6:30', label: 'PM 6:30' },
    { value: 'PM 7:00', label: 'PM 7:00' },
    { value: 'PM 7:30', label: 'PM 7:30' },
    { value: 'PM 8:00', label: 'PM 8:00' },
    { value: 'PM 8:30', label: 'PM 8:30' },

  ];

  const [selectedTimeOption, setSelectedTimeOption] = useState(timeOptions[20]);
  const handleSelectTimeChange = ( event : any) => {
   setSelectedTimeOption(event);
   setTime(event.label);
  }


  // 장소 DB 가져오기 ----------------------------------------------
  interface placeListProps {
    id : number,
    place: string,
    address : string,
  }

  const [placeList, setPlaceList] = useState<placeListProps[]>([]);
  const [viewAutoComplete, setViewAutoComplete] = useState<boolean>(false);
  const [dropDownList, setDropDownList] = useState<placeListProps[]>([]);
  const [dropDownItemIndex, setDropDownItemIndex] = useState(-1);
  const [isComposing, setIsComposing] = useState(false);

  const fetchPosts = async () => {
    const res = await axios.get(`${MainURL}/datacontrol/dataplace`)
    if (res) {
      let copy = res.data;
      setPlaceList(copy);
    }
  };
  
  useEffect(() => {
    fetchPosts();
  }, []);


  // 장소 입력란 자동완성  ----------------------------------------------
  const handlePlaceSelect = (e:any) => {
    setPlace(e.target.value);
    setViewAutoComplete(true);
    handleAutoComplete(e.target.value);
  }

  const handleAutoComplete = (text : string ) => {
    const copy = placeList.filter((e: any) => e.place.includes(text) === true);
    setDropDownList(copy);
  }

  const handleDropDownKey = (event:any) => {
    if (isComposing) return;
    if (viewAutoComplete) {
      if (event.key === 'ArrowDown' && dropDownItemIndex === -1) {
        setDropDownItemIndex(0)
      } else if (event.key === 'ArrowDown' && dropDownItemIndex >= 0 && dropDownItemIndex !== dropDownList.length - 1) {
        setDropDownItemIndex(dropDownItemIndex + 1)
      } else if (event.key === 'ArrowDown' && dropDownItemIndex === dropDownList.length - 1) {
        return
      } else if (event.key === 'ArrowUp' && dropDownItemIndex >= 0) {
        setDropDownItemIndex(dropDownItemIndex - 1)
      } else if (event.key === 'Enter' && dropDownItemIndex >= 0) {
        setPlace(dropDownList[dropDownItemIndex].place);
        setAddress(dropDownList[dropDownItemIndex].address);
        setViewAutoComplete(false);
        setDropDownItemIndex(-1)
      } else if (event.key === 'Enter' && dropDownItemIndex === -1) {
        setViewAutoComplete(false);
      }
    }
  }
  
  // 주소 입력란  ----------------------------------------------
  const [viewAddress, setViewAddress] = useState<boolean>(false);
  
  const onCompletePost = (data:any) => {
    setViewAddress(false);
    setAddress(data.address);
  }

  // 문의 입력란 숫자 확인 ----------------------------------------------
  
  const onChangequiry = (text : any) => {
    const quiryRegex = /[\d -]+$/;
    if (!quiryRegex.test(text)) {
      alert('숫자와 -로만 입력해주세요')
    } else {
      setQuiry(text);
    }
  };  

  // 포스터 형식 선택 ----------------------------------------------
  const [selectStylePoster, setSelectStylePoster] = useState(0);
    
  // 이미지 캡처 함수 ----------------------------------------------
  const captureArea = useRef<HTMLDivElement | null>(null);
  const captureAndSave = () => {
    if (captureArea.current !== null) {
      html2canvas(captureArea.current)
      .then(canvas => {
        const link = document.createElement('a');
        document.body.appendChild(link);
        link.href = canvas.toDataURL('image/png');
        link.download = `${part}-${nameEn}.png`;
        link.click();
        document.body.removeChild(link);
      })
      .catch(err => {console.log(err);});
    }
  };

  // 이미지 첨부 함수 ----------------------------------------------

  const [imageLoading, setImageLoading] = useState<boolean>(false);
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      const options = {
        maxSizeMB: 1,
        maxWidthOrHeight: 1000
      };
      const resizedFiles = await Promise.all(
        acceptedFiles.map(async (file) => {
          setImageLoading(true);
          const resizingBlob = await imageCompression(file, options);
          setImageLoading(false);
          return resizingBlob;
        })
      );
      const copy = new File(resizedFiles, acceptedFiles[0].name, { type: acceptedFiles[0].type });
      setImageFiles([copy]);
    } catch (error) {
      console.error('이미지 리사이징 중 오류 발생:', error);
    }
  }, [setImageFiles]);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  
  // controlBox --------------------------------------------------------------------------------------------
  // 스타일 변경
  const [selectStyle, setSelectStyle] = useState(1);

  // 이미지 사이즈 변경
  const [selectWidth, setSelectWidth] = useState(450);
  const [selectHeight, setSelectHeight] = useState(600);

  // 색상 변경 

  const [showColorBox1, setShowColorBox1] = useState<boolean>(false)
  const [selectColor1, setSelectColor1] = useState('#fff');
  const [showColorBox2, setShowColorBox2] = useState<boolean>(false)
  const [selectColor2, setSelectColor2] = useState('#fff');
  const handleChangeColor1 = (event : any) => {
    setSelectColor1(event.hex);
    setShowColorBox1(false);
  };  
  const handleChangeColor2 = (event : any) => {
    setSelectColor2(event.hex);
    setShowColorBox2(false);
  };

  // 위치 변경  ----------------------------------------------
  // style1
  const [selectTop1, setSelectTop1] = useState(30);
  const [selectTop2, setSelectTop2] = useState(250);
  const [selectBottom1, setSelectBottom1] = useState(120);
  const [selectBottom2, setSelectBottom2] = useState(90);
  const [selectBottom3, setSelectBottom3] = useState(70);
  const [selectBottom4, setSelectBottom4] = useState(55);


  // 프로그램 팜플렛 정보 등록 함수 ----------------------------------------------
  const registerPost = async () => {
    // navigate('/registerprogram', {state : { 
    //           pamphletID : 100, type: 'small', part : 'Tenor', sort: 'Vocal'
    //         }});
    setIsLoading(true);
    const formData = new FormData();
    formData.append("img", imageFiles[0]);
    const getParams = {
      userAccount : 'johnleedev@naver.com', userName: '이요한',
      registerDate : formatToday, type: useLocationCopy.state.type, playerNum : useLocationCopy.state.playerNum,
      sort: sort, title: title, location: location, date: date, dateOrigin: dateOrigin,
      time : time, place : place, address : address, 
      superViser :superViser, supporter : supporter,
      ticket :ticket, ticketReserve: ticketReserve, quiry :quiry,
      imageName : imageFiles[0].name,
    }
    axios 
      .post(`${MainURL}/pamphlets/postdefault`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        params: getParams,
      })
      .then((res) => {
        if (res.data.success === true) {
          alert('입력되었습니다.');
          navigate('/registerprogram', {state : { 
            pamphletID : res.data.pamphletID, type: useLocationCopy.state.type, part : part, sort: sort 
          }}); 
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
        <SubTitle name='STEP 1.'/>

        {/* 기본정보 */}
        <div className='registerDefaultBox'>
          <div className="register name"><p>연주회 기본 정보</p></div>
          <div className="divider"></div>
          <div className="register content">
            <div className="inputbox">
              <div className='name'>
                <p>연주회 제목</p>
              </div>
              <input type="text" onChange={(e)=>{setTitle(e.target.value)}} value={title} />
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>구분</p>
              </div>
              <div className='input selectInput'>
                <div className={selectSort === 1 ? 'sortSelectBox selected' : 'sortSelectBox'} 
                   onClick={()=>{setSelectSort(1); setSort(sortOptions[0].value)}}>
                  {sortOptions[0].label}
                </div>
                <div className={selectSort === 2 ? 'sortSelectBox selected' : 'sortSelectBox'} 
                    onClick={()=>{setSelectSort(2); setSort(sortOptions[1].value)}}>
                  {sortOptions[1].label}
                </div>
                <div className={selectSort === 3 ? 'sortSelectBox selected' : 'sortSelectBox'} 
                   onClick={()=>{setSelectSort(3); setSort(sortOptions[2].value); setPart('Piano')}}>
                  {sortOptions[2].label}
                </div>
              </div>
            </div>
            {
              useLocationCopy.state.type === 'solo' &&
              <div className="inputbox">
                <div className='name'>
                  <p>파트</p>
                </div>
                { selectSort === 1 && 
                  <Select className='input' value={selectedPartOption}
                  onChange={handleSelectPartChange}
                  options={partOptionsOrchestral} /> 
                }
                { selectSort === 2 && 
                <Select className='input' value={selectedPartOption}
                onChange={handleSelectPartChange}
                options={partOptionsVocal} /> 
                }
                { selectSort === 3 && 
                <input type="text" onChange={(e)=>{setPart(e.target.value)}} value={part}/>
                }
              </div>
            }
            <div className="inputbox">
              <div className='name'>
                <p>영문 이름</p>
                <p style={{fontSize:12}}>(선택/포스터용)</p>
              </div>
              <input type="text" onChange={(e)=>{setNameEn(e.target.value)}} value={nameEn} 
                placeholder={ useLocationCopy.state.playerNum > 1 ? 'ex) Hong Gildong, Kim cheolsu' : 'ex) Hong Gildong'}/>
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>지역</p>
              </div>
              <Select
                className='input'
                value={selectedLocationOption}
                onChange={handleSelectLocationChange}
                options={locationOptions}
              />
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>날짜</p>
              </div>
              <DatePicker
                locale={ko}
                dateFormat='yyyy년 MM월 dd일 (eee)'
                shouldCloseOnSelect
                minDate={new Date('2022-01-01')}
                selected={startDate}
                onChange={handleSelectDateChange}
              />
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>시간</p>
              </div>
              <Select
                className='input'
                value={selectedTimeOption}
                onChange={handleSelectTimeChange}
                options={timeOptions}
              />
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>장소</p>
              </div>
              <input type="text" value={place}
                onChange={handlePlaceSelect}
                onBlur={()=>{setViewAutoComplete(false)}}
                onKeyDown={handleDropDownKey}
                onCompositionStart={() => setIsComposing(true)}
                onCompositionEnd={() => setIsComposing(false)}
              />
              { place !== '' && viewAutoComplete &&
                <div className="autoComplete">
                  { dropDownList.length === 0 && (
                    <div className='dropDownList'>해당하는 단어가 없습니다</div>
                  )}
                  { dropDownList.length > 0 && 
                  <>
                    <div className='dropDownList' style={{fontSize:10}}>(아래 화살표를 눌러서 선택하세요)</div>
                    { 
                      dropDownList.map((item:any, index:any)=>{
                        return(
                          <div key={index} className={dropDownItemIndex === index ? 'dropDownList selected' : 'dropDownList'}>{item.place}</div>
                        )
                      })
                    }
                  </>  
                  }
                </div>  
              }              
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>주소</p>
              </div>
              <input type="text" onChange={(e)=>{setAddress(e.target.value)}} value={address} />
              <div className='magnifyIcon' onClick={()=>{setViewAddress(true)}}>
                <p>주소검색</p>
                <SlMagnifier />
              </div>
              {
                viewAddress &&
                <div className='DaumPostBox'>
                  <DaumPostcode
                    onComplete={onCompletePost}
                  ></DaumPostcode>
                </div>
              }
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>주관/주최</p>
                <p style={{fontSize:12}}>(선택)</p>
              </div>
              <input type="text" onChange={(e)=>{setSuperViser(e.target.value)}} value={superViser} />
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>후원</p>
                <p style={{fontSize:12}}>(선택)</p>
              </div>
              <input type="text" onChange={(e)=>{setSupporter(e.target.value)}} value={supporter} />
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>티켓가격</p>
                <p style={{fontSize:12}}>(선택)</p>
              </div>
              <input type="text" onChange={(e)=>{setTicket(e.target.value)}} value={ticket} placeholder='ex) 전석 1만원' />
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>티켓예매</p>
                <p style={{fontSize:12}}>(선택)</p>
              </div>
              <input type="text" onChange={(e)=>{setTicketReserve(e.target.value)}} value={ticketReserve} placeholder='티켓 예매 링크를 입력해주세요'/>
            </div>
            <div className="inputbox">
              <div className='name'>
                <p>문의</p>
              </div>
              <input type="text" onChange={(e)=>{onChangequiry(e.target.value)}} value={quiry} />
            </div>
          </div>
        </div>

        <div className='registerDefaultBox'>
          <div className="register name"><p>포스터</p></div>
          <div className="divider"></div>

          {/* // -------------------------------------------------------- */}
          {
            selectStylePoster === 0 &&
            <div className="register select">
              <div className='noticeArea'>
                포스터 이미지 형식 선택
              </div>
              <div className='selectArea'>
                <div className="selectboxCover">
                  <div className="selectbox" onClick={()=>{setSelectStylePoster(1)}}>
                    <p>이미 제작된 포스터 이미지 파일을</p>
                    <p>가지고 있어요</p>
                  </div>
                </div>
                <div className="selectboxCover">
                  <div className="selectbox" onClick={()=>{setSelectStylePoster(2)}}>
                    <p>여기서 간단하게 만들래요</p>
                  </div>
                </div>
                <div className="selectboxCover">
                  <div className="selectbox" onClick={()=>{setSelectStylePoster(3)}}>
                    <p>이로운팜플렛의 전문 디자이너에게</p>
                    <p>포스터 디자인을 맡길래요</p>
                  </div>
                </div>
              </div>
            </div> 
          }
         
          {/* // -------------------------------------------------------- */}
          {
            (selectStylePoster === 1 || selectStylePoster === 3) &&
            <div className="register poster">
              <div className='backBtn' onClick={()=>{setSelectStylePoster(0)}}><FaArrowLeft /></div>
              {
                imageFiles.length > 0 ? null : 
                <p className='noticeText'>
                  { selectStylePoster === 1 && "* 포스터 이미지 파일을 첨부해 주세요"}
                  { selectStylePoster === 3 && "* 프로필 이미지 파일을 첨부해 주세요"}
                </p>
              }
              <div className='imageContainer'>
                <div
                  className="imageBox" 
                  style={{width: `${selectWidth}px`, height: `${selectHeight}px`}}
                >
                  {imageFiles.length > 0 ? (
                    <img
                      src={URL.createObjectURL(imageFiles[0])}
                      style={{ width: '100%', height: '100%'}}
                    />
                    ) : (
                      <>
                      {
                        imageLoading ?
                        <div style={{width:'100%', height:'100%', position:'absolute'}}>
                          <Loading/>
                        </div>
                        :
                        <div {...getRootProps()} className="imageDropzoneStyle" >
                          <input {...getInputProps()} />
                          <div className='imageplus'>+</div>
                        </div>
                      } 
                      </>
                    )
                  }
                </div>
              </div>
              {
                imageFiles.length > 0 &&
                <div className='imageControlBtn-default' onClick={()=>{setImageFiles([])}}>삭제하기</div>
              }
            </div>
          }
          

          {/* // -------------------------------------------------------- */}
          
          { selectStylePoster === 2 &&
            <>
            <div className="register poster">
              <div className='backBtn' onClick={()=>{setSelectStylePoster(0)}}><FaArrowLeft /></div>
              { imageFiles.length > 0 ? null : <p className='noticeText'>* 먼저 프로필 이미지 파일을 첨부해 주세요(2MB이하만 가능)</p> }
              <div className='imageContainer'ref={captureArea}>
                <div
                  className="imageBox" 
                  style={{width: `${selectWidth}px`, height: `${selectHeight}px`}}
                >
                  {imageFiles.length > 0 ? (
                    <img
                      src={URL.createObjectURL(imageFiles[0])}
                      style={{ width: '100%', height: '100%'}}
                    />
                    ) : (
                      <>
                      {
                        imageLoading ?
                        <div style={{width:'100%', height:'100%', position:'absolute'}}>
                          <Loading/>
                        </div>
                        :
                        <div {...getRootProps()} className="imageDropzoneStyle" >
                          <input {...getInputProps()} />
                          <div className='imageplus'>+</div>
                        </div>
                      } 
                      </>
                    )
                  }
                </div>
                {
                  imageFiles.length > 0 &&
                  <div className="cover" style={{width: `${selectWidth}px`, height: `${selectHeight}px`}}>
                    <div className={`style${selectStyle} title`} style={{color:selectColor1, top:selectTop1}}>{title}</div>
                    <div className={`style${selectStyle} part-name`} style={{color:selectColor2, top:selectTop2}}>
                      <div className="part">{part}</div>
                      <div className="nameEn">{nameEn}</div>
                      <div className="recital">RECITAL</div>
                    </div>
                    <div className={`style${selectStyle} date-time`} style={{bottom:selectBottom1}}>
                      <div className="date">{date}</div>
                      <div className="time">{time}</div>
                    </div>
                    <div className={`style${selectStyle} place`} style={{bottom:selectBottom2}}>{place}</div>
                    <div className={`style${selectStyle} superViser-supporter`} style={{bottom:selectBottom3}}>
                      { superViser !== '' && <div className="sublist superViser">주관:<p>{superViser}</p></div>}
                      { supporter !== '' && <div className="sublist supporter">후원:<p>{supporter}</p></div>}
                    </div>
                    <div className={`style${selectStyle} ticket-quiry`} style={{bottom:selectBottom4}}>
                      { ticket !== '' && <div className="sublist ticket">티켓:<p>{ticket}</p></div>}
                      { ticketReserve !== '' &&  <div className="sublist ticketReserve">예매처:<p>{ticketReserve}</p></div>}
                      <div className="sublist quiry">문의:<p>{quiry}</p></div>
                    </div>
                    <img src={logo} className={`style${selectStyle} logo`}/>
                  </div>
                }
              </div>
            </div>
            <div className="divider"></div>
            <div className="register control">
              {
                imageFiles.length > 0 &&
                <div style={{display:'flex'}}>
                  <div className="cover content">
                    <div className="box">
                      <div className='imageControlBtn' onClick={()=>{setImageFiles([])}}>삭제하기</div>
                    </div>
                    <div className="box">스타일 변경</div>
                    <div className="box">이미지 전체 크기 조절</div>
                    <div className="box title">제목: {title}</div>
                    <div className="box part-name"> 
                      <div className="part">{part}</div>
                      <div className="nameEn">{nameEn}</div>
                      <div className="recital">RECITAL</div>
                    </div>
                    <div className="box date-place"> 
                      <div className="box date-place-cover"> 
                        <div className="date">{date}</div>
                        <div className="time">{time}</div>
                      </div>
                      <div className="place">{place}</div>
                    </div>
                    <div className="box supporter-ticket"> 
                      <div className="date">{superViser}</div>
                      <div className="time">{supporter.substring(0, 20) + '...'}</div>
                      <div className="box supporter-ticket-cover">
                        <div className="ticket">{ticket}</div>
                        <div className="ticketReserve">{ticketReserve}</div>
                        <div className="quiry">{quiry}</div>
                      </div>
                    </div>

                    <div className="box">
                      <div className='imageControlBtn' onClick={captureAndSave}>캡처&저장하기</div>
                    </div>
                    <div className="box">
                      <div className='imageControlBtn' 
                        onClick={()=>{setSelectStylePoster(1); setImageFiles([]);}}>사진올리기</div>
                    </div>
                  </div>
                  <div className="cover control">
                    <div className="box"></div>
                    <div className="box">
                      <div className='selectStyleBtn' onClick={()=>{setSelectStyle(1)}}>1</div>
                      <div className='selectStyleBtn' onClick={()=>{setSelectStyle(2)}}>2</div>
                      <div className='selectStyleBtn' onClick={()=>{setSelectStyle(3)}}>3</div>
                    </div>
                    <div className="box">
                      <div className='selectWidthBtn'>
                        가로<p onClick={()=>{setSelectWidth(selectWidth + 10)}}>+</p>
                          <p onClick={()=>{setSelectWidth(selectWidth - 10)}}>-</p>
                      </div>
                      <div className='selectWidthBtn'>
                        세로<p onClick={()=>{setSelectHeight(selectHeight + 10)}}>+</p>
                          <p onClick={()=>{setSelectHeight(selectHeight - 10)}}>-</p>
                      </div>
                    </div>
                    <div className="box">
                      <p onClick={()=>{setShowColorBox1(true)}} className='selectColorBtn'>색상변경</p>
                      { 
                        showColorBox1 &&
                        <SwatchesPicker className='selectColorBox'
                          onChange={handleChangeColor1}
                        />
                      }
                      <div className='selectWidthBtn'>
                        위치<p onClick={()=>{setSelectTop1(selectTop1 - 10)}}><IoIosArrowRoundUp size={16}/></p>
                          <p onClick={()=>{setSelectTop1(selectTop1 + 10)}}><IoIosArrowRoundDown size={16}/></p>
                      </div>
                    </div>
                    <div className="box">
                      <p onClick={()=>{setShowColorBox2(true)}} className='selectColorBtn'>색상변경</p>
                      { 
                        showColorBox2 &&
                        <SwatchesPicker className='selectColorBox'
                          onChange={handleChangeColor2}
                        />
                      }
                      <div className='selectWidthBtn'>
                        위치<p onClick={()=>{setSelectTop2(selectTop2 - 10)}}><IoIosArrowRoundUp size={16}/></p>
                          <p onClick={()=>{setSelectTop2(selectTop2 + 10)}}><IoIosArrowRoundDown size={16}/></p>
                      </div>
                    </div>
                    <div className="box">
                      <div className='selectWidthBtn'>
                        위치<p onClick={()=>{
                            setSelectBottom1(selectBottom1 + 10);
                            setSelectBottom2(selectBottom2 + 10);
                          }}><IoIosArrowRoundUp size={16}/></p>
                          <p onClick={()=>{
                            setSelectBottom1(selectBottom1 - 10);
                            setSelectBottom2(selectBottom2 - 10);
                          }}><IoIosArrowRoundDown size={16}/></p>
                      </div>
                    </div>
                    <div className="box">
                      <div className='selectWidthBtn'>
                        위치<p onClick={()=>{
                            setSelectBottom3(selectBottom3 + 10);
                            setSelectBottom4(selectBottom4 + 10);
                          }}><IoIosArrowRoundUp size={16}/></p>
                          <p onClick={()=>{
                            setSelectBottom3(selectBottom3 - 10);
                            setSelectBottom4(selectBottom4 - 10);
                          }}><IoIosArrowRoundDown size={16}/></p>
                      </div>
                    </div>
                    <div className="box"></div>
                    <div className="box">* 저장된 파일을 다시 업로드 해야만, 정상적으로 등록됩니다.</div>
                 </div>
                </div>
              }
            </div>
            </>
          }
        </div>


        <div className="buttonbox">
          <div className="button" onClick={()=>{
            navigate('/registertypeselect'); 
          }}>
            <p>이전</p>
          </div>
          <div className="button" onClick={registerPost}>
            <p>다음</p>
          </div>
        </div>

      </div>

      <Footer/>
    </div>
  );
}

