export const GetListDataVideo = async (setDatas, setRefresh, MaVD, screen) => {    
  try {
    const response = await fetch('https://toanyoutubefake.000webhostapp.com/category.php');
    const jsonResponse = await response.json();

    if (jsonResponse.length > 0) {
      if(screen == 'Home')
      {
        setDatas(jsonResponse);
        setRefresh(false);
      }
      else
      {
        const FilterDatas = jsonResponse.filter((item) => item.MaVD !== MaVD);
        const Datas = FilterDatas.slice(0, 5);
        setDatas(Datas);
      }
    } else {
      console.log("Response is empty.");
    }
  } catch (error) {
    console.log(error);
  }
}

export const GetDataByType = async (setDatas, type) => {
  try {
    const response = await fetch('https://toanyoutubefake.000webhostapp.com/category.php');
    const jsonResponse = await response.json();

    if (jsonResponse.length > 0) {
      const FilterDatas = jsonResponse.filter((item) => item.Theloai === type);
      setDatas(FilterDatas);
    } else {
      console.log("Response is empty.");
    }
  } catch (error) {
    console.log(error);
  }
}

export const GetVideoType = async (setDatas) => {
  try {
    const response = await fetch('https://toanyoutubefake.000webhostapp.com/videoType.php');
    const jsonResponse = await response.json();

    if (jsonResponse.length > 0) {
      setDatas(jsonResponse);
    } else {
      console.log("Response is empty.");
    }
  } catch (error) {
    console.log(error);
  }
}

export const GetVideoInteracts = async (setLikeDatas, setDisLikeDatas, setCommentDatas, setSaveDatas, MaVD) => {
  try {
    const response = await fetch('https://toanyoutubefake.000webhostapp.com/videoInteracts.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        MaVD: MaVD,
      })
    })
    const jsonResponse = await response.json();

    if (jsonResponse.length > 0) {
      const likeDatas = jsonResponse.filter((item) => item.Type === 'Like');
      setLikeDatas(likeDatas);

      const disLikeDatas = jsonResponse.filter((item) => item.Type === 'DisLike');
      setDisLikeDatas(disLikeDatas);
      
      const commentDatas = jsonResponse.filter((item) => item.Type === 'Comment');
      commentDatas.sort((a, b) => a.PostTime - b.PostTime);
      commentDatas.reverse();
      setCommentDatas(commentDatas);

      const saveDatas = jsonResponse.filter((item) => item.Type === 'Save');
      setSaveDatas(saveDatas);
    } else {
      console.log("Response is empty.");
    }
  } catch (error) {
    console.log(error);
  }
}

export const GetAlbumVideo = async (setDatas, user, screen) => {
  try {
    const response = await fetch('https://toanyoutubefake.000webhostapp.com/albumVideo.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: user,
        screen: screen,
      })
    })
    const jsonResponse = await response.json();

    if (jsonResponse.length > 0) {
      setDatas(jsonResponse);
    } else {
      console.log("Response is empty.");
    }
  } catch (error) {
    console.log(error);
  }
}