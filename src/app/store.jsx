import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/authSlice"; //authSlice içindeki authSlice.reducer a authReducer ismini verdik.
import newsReducer from "../features/newsSlice"; //newsSlice içindeki newsSlice.reducer a newsReducer ismini verdik.

//! configureStore metodu hem bir store olusturur hem de oluştururken farkli reducer'lari birleştirir.
const store = configureStore({
  reducer: {
    auth: authReducer,
    news: newsReducer,
  },
  devTools: process.env.NODE_ENV !== "production", //true false değer üretir.
  //! Dev tool'u kapatmak icin kullanılan degisken. process.env. değişkeni sayesinde node ortamlarında geliştirme aşamasını process.env. ile okuyabiliyoruz.
  // devTools:false dersek direk kapatır.yukardaki ise sadece geliştirme aşamasında açık.production da kapalı olur.yani test ,developer gibi aşamalarda açık. yarn run build dersek developmentdan production aşaması oluyor bunu anlıyor.
});

export default store;

// reducer birden fazla reducer ı birleştiriyor.
// auth: authReducer, authReducer a auth adını verdik vermesek de olurdu. key value aynı kalırdı.
// Store oluşturmak istiyorsak normal redux da createStore ile idi.
// Redux toolkit de ise configureStore ile oluşturcaz ve farklı reducer'lari birlestircez.
// redux ta herşey obje formatında.
