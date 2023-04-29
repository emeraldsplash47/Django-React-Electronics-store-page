from django.urls import path
from base.views import user_views as views


# urls for our API end-points
urlpatterns  = [

    path('login/', views.MyTokenObtainPairView.as_view(),name='token_obtain_pair'),

    path('profile/', views.getUserProfile, name= "users-profile"),

    path('', views.getUsers, name= "users"),
    path('register/', views.resgisterUser, name= 'register'),
    path('profile/update/', views.updateUserProfile, name= "users-profile-update"),
]