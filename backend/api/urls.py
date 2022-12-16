from django.urls import path, include
from rest_framework import routers

from api.views import TurnoViewSet, me
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import RegisterView
from api.views import PagoViewSet

from api.views import turnos_disponibles


from api.views import update_user

from api.views import delete_user

from api.views import editar_turno_paciente

from api.views import generar_preferencia

from api.views import getturno

router = routers.DefaultRouter()
router.register("turnos", TurnoViewSet)
router.register("pagos", PagoViewSet)

urlpatterns = [
    path("", include(router.urls)),
    path('login/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view()),
    path("turnosdisponibles/", turnos_disponibles),
    path('me/', me),
    path("updateuser/", update_user),
    path("deleteuser/", delete_user),
    path("reservarturno/", editar_turno_paciente),
    path("generarlpreferencia/", generar_preferencia),
    path('getturno/', getturno)
]
