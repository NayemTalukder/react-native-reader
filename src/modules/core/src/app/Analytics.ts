// import analytics from '@react-native-firebase/analytics';

// export const analytic = {
//     view_search (payload:string) {
//         analytics().logEvent('view_search', { route_name: payload });
//     },
//     search_log_event (payload:string) {
//         analytics().logEvent('search_view_'+payload);
//     },
//     view_book_details  (book_name:string, through:string) {
//         analytics().logEvent('view_book_details', { book_name, through });
//     },
//     view_slider (payload:string) {
//         const [type, name] = payload;
//         if(type === 'trending' || type === 'top_rated' || type === 'most_read') {
//             analytics().logEvent('view_slider', { type });
//         } else analytics().logEvent('view_slider', { type, name });
//     },
//     filter_log_event (payload:string) {
//         const [type, value] = payload;
//         analytics().logEvent(type, { value });
//     },
//     tab_view (screen:string, isTabPressed:string, other:string) {
//         if(other) {
//             analytics().logEvent('view_'+screen, {
//                 method: 'other'
//             });
//         } else if(isTabPressed) {
//             analytics().logEvent('view_'+screen, {
//                 method: 'tab pressed'
//             });
//         } else {
//             analytics().logEvent('view_'+screen, {
//                 method: 'swiped'
//             });
//         }
//     },
//     drawer_open (isDrawerSwiped:string) {
//         if(isDrawerSwiped) {
//             analytics().logEvent('sidebar_open', {
//                 method: 'swiped',
//             });
//         } else {
//             analytics().logEvent('sidebar_open', {
//                 method: 'button pressed'
//             });
//         }
//     },
//     navigate_through_drawer (payload:string) {
//         analytics().logEvent(payload);
//     },
//     view_reader  (book_name:string, through:string) {
//         analytics().logEvent('view_reader', {
//             book_name, through
//         });
//     },
//     login (payload:string) {
//         analytics().logEvent('login', {
//             method: payload
//         });
//     },
//     press_favourite (payload:string) {
//         const [action, book_name] = payload;
//         analytics().logEvent('press_favourite_button', {
//             action, book_name
//         });
//     },
//     swipe_favourites (payload:string) {
//         const [action, book_name] = payload;
//         analytics().logEvent('swipe_favourites', {
//             action, book_name
//         });
//     },
//     submit_review (payload:string) {
//         const [rating, book_name] = payload;
//         analytics().logEvent('submit_review', {
//             rating, book_name
//         });
//     },
//     reader_log_event (payload:any) {
//         if(payload.length === 1) {
//             analytics().logEvent(payload[0]);
//         } else if(payload.length === 2) {
//             const [type, book_name] = payload;
//             analytics().logEvent(type, { book_name });
//         } else {
//             const [type, book_name, dataType, value] = payload;
//             if(dataType === 'theme') analytics().logEvent(type, {book_name, theme: value});
//             else if(dataType === 'flow') analytics().logEvent(type, {book_name, flow: value});
//             else if(dataType === 'font_size') analytics().logEvent(type, {
//                 book_name, font_size: value
//             });
//         }
//     },
// }





