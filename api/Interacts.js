export const InteractHanlder = async (mavd, username, type, title, Alert) => {
    try {
      const response = await fetch('https://toanyoutubefake.000webhostapp.com/sendInteracts.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mavd: mavd,
          username: username,
          type: type,
          title: title,
          posttime: Date.now(),
        })
      })
      const jsonResponse = await response.json();
  
      if (jsonResponse.length > 0) {
        if(jsonResponse[0].Message == 'true')
        {
          console.log('gửi tương tác thành công');
        }
        else
        {
          Alert.alert("Thông báo!", jsonResponse[0].Message);
        }
      } else {
        console.log("Response is empty.");
      }
    } catch (error) {
      console.log(error);
    }
}

export const RemoveInteractHanlder = async (mavd, username, type, Alert) => {
    try {
      const response = await fetch('https://toanyoutubefake.000webhostapp.com/removeInteracts.php', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mavd: mavd,
          username: username,
          type: type,
        })
      })
      const jsonResponse = await response.json();
  
      if (jsonResponse.length > 0) {
        if(jsonResponse[0].Message == 'true')
        {
          console.log('tương tác thành công');
        }
        else
        {
          Alert.alert("Thông báo!", jsonResponse[0].Message);
        }
      } else {
        console.log("Response is empty.");
      }
    } catch (error) {
      console.log(error);
    }
}

export const handlerView = async (mavd) => {
  try {
    const response = await fetch('https://toanyoutubefake.000webhostapp.com/updateView.php', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        mavd: mavd,
      })
    })
    const jsonResponse = await response.json();

    if (jsonResponse.length > 0) {
      if(jsonResponse[0].Message == 'true')
      {
        console.log('VIew+++');
      }
      else
      {
        Alert.alert("Thông báo!", jsonResponse[0].Message);
      }
    } else {
      console.log("Response is empty.");
    }
  } catch (error) {
    console.log(error);
  }
}