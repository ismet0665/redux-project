import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  news: [],
  loading: false,
  error: false,
};

//state imiz api den gelen veriye göre değişiyorsa. api asekron bir işlem zaman kaybettiriyor. state imizi güncellerken ara yazılım kullanılıyor middleware(arayazılım) gibi.middleware aslında yayınladıgımız dispatch i isteği api den cevabını aldıktan sonra pure bir action objesi oluşturup bunu reducers a sunuyor.
//* redux ın içinde dafault tanımlanmış thunk adında middleware var.
//* createAsyncThunk ile veri çekeceğiz. createAsyncThunk 2 tane parametre alıyor 1- type string ifade "getNews" yani type olusturuyoruz herhangi bir isim 2- async func.

export const getNews = createAsyncThunk(
  "getNews", //? action types
  //? async callback func
  // { rejectWithValue } ile hataları yakalattırabiliyoruz.thunkAPI i kalıp olarak yazdık.???
  async (thunkAPI, { rejectWithValue }) => {
    const API_KEY = "41244be7b2d94e4f8ceba1de43627974";
    const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

    try {
      const { data } = await axios(url);
      console.log(data);
      return data.articles; //veri datanın içindeki articles ın içinde oldugu için return nü bu şekilde yazdık.
    } catch (error) {
      console.log(error);
      return rejectWithValue(
        "Since the news api is used, we cannot publish it at the product stage. You can run it locally."
      ); // rejectWithValue props u ile hatayı yakalattırıyoruz. return ile aşagıdaki case e getNews.rejected, gönderiyoruz.
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    clearNews: (state) => {
      //payload a gerek yok(state,payload)
      state.news = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getNews.pending, (state) => {
        state.loading = true;
      })
      .addCase(getNews.fulfilled, (state, action) => {
        state.news = action.payload;
        state.loading = false;
      })
      .addCase(getNews.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload; //yukarda rejectWithValue ile yakaladıgımız hatayı getNews.rejected state ine dönüş oluyor.hatayı görmek içinde state in içindeki error action dan gelen payload ile görebiliriz.
      });
  },
});

export const { clearNews } = newsSlice.actions;

export default newsSlice.reducer;

//! rxslice snippet i ile olusturabiliriz.
//! api den gelen verilerin state in nasıl güncelleriz.
//! extraReducers sideefek deniyor. builder(ismi değişebilir) veriliyor. extraReducers bir func.
//* builder.addCase() methodu ile api isteğinde bulunan stateler ve yan stateleri kontrol ediyoruz. Api isteginde 3 durum var
// 1-pending = istege başla 2-fulfilled = yerine getirilmiştir,başarılı  3-rejected = reddedilmiş, başarısız.
// getNews.pending, yani getNews başlama aşamasındaysa bir func yazıyoruz (state) => {state.loading = true;} ve değiştirmek istediğimiz stateleri değiştiriyoruz.

// createAsyncThunk func. yapılan istek dogrudan state leri güncellemiyor. yan etkiler arkadan gelen güncellemeleri extraReducers adını verdiğimiz kısımla yapıyoruz.
