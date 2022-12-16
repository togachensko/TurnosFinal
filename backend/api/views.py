from django.contrib.auth import get_user_model
from django.http import HttpResponse
from rest_framework import generics, viewsets, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.serializers import TurnoSerializer, MeSerializer, TurnoSerializer1
from api.serializers import RegisterSerializer
from api.serializers import PagoSerializer

from api.models import Turno
from api.models import Pago

# SDK de Mercado Pago
import mercadopago


class TurnoViewSet(viewsets.ModelViewSet):
    permission_classes = [permissions.IsAuthenticated] # TENES QUE ESTAR LOGUEADO PARA SEGUIR
    serializer_class = TurnoSerializer1
    queryset = Turno.objects.all()

    def perform_create(self, serializer):
        serializer.save(doctor_id=self.request.user.id)

    def get_queryset(self):
        return Turno.objects.filter(doctor_id=self.request.user.id)

    def delete_queryset(self):
        return Turno.objects.filter(doctor_id=self.request.user.id)

    def put_queryset(self):
        return Turno.objects.filter(doctor_id=self.request.user.id)

    def patch_queryset(self):
        return Turno.objects.filter(doctor_id=self.request.user.id)



# CreateAPIView solo crea la parte de CREATE del AMB
# Solo necesitamos una sola ruta POST para crear un usuario
# El queryset no hace falta ya que solo es necesario para rutas que hay que indicar un conjunto de datos con los que trabaje
class RegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer


class PagoViewSet(viewsets.ModelViewSet):
    serializer_class = PagoSerializer
    queryset = Pago.objects.all()

    # def perform_create(self, serializer):
    #     serializer.save(doctor_id=self.request.user.id)


# Otra manera de crear rutas.heredar de clases creadas por Django, sino con funciones
# Recibe como parametro request

@api_view(["GET"])
@permission_classes([IsAuthenticated])
def me(request):
    return Response(MeSerializer(request.user).data, 200)


@api_view(["PATCH"])
@permission_classes([IsAuthenticated])
def update_user(request):
    user = request.user
    data = request.data
    userDB = get_user_model().objects.filter(pk=user.id).first()
    user_serializer = MeSerializer(userDB, data=data, partial=True)
    if user_serializer.is_valid():
        user_serializer.save()
    return Response(user_serializer.data, 200)

@api_view(["PATCH"])
def editar_turno_paciente(request):
    turno_id = request.GET.get("id")
    turno = Turno.objects.filter(pk=turno_id).first()
    data = request.data
    serializer = TurnoSerializer1(turno, data, partial=True)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data, 200)

@api_view(["DELETE"])
@permission_classes([IsAuthenticated])
def delete_user(request):
    user = request.user
    userDB = get_user_model().objects.filter(pk=user.id).first()
    userDB.delete()
    return Response("Eliminado", 200)


@api_view(["GET"])
def turnos_disponibles(request):
    query_doctor_id = request.GET.get("doctor_id")
    turnos = Turno.objects.filter(is_taken=False, doctor_id=query_doctor_id)
    serializer = TurnoSerializer1(turnos, many=True)
    return Response(serializer.data, 200)

@api_view(["GET"])
def getturno(request):
    query_turno_id = request.GET.get("turno_id")
    turno = Turno.objects.filter(id=query_turno_id).first()
    serializer = TurnoSerializer(turno)
    return Response(serializer.data, 200)

@api_view(["PATCH"])
def generar_preferencia(request):
    # Agrega credenciales
    sdk = mercadopago.SDK("TEST-8883658164646049-121611-075f3efd9f2e41822efaa1a960bd18ac-337457989")
    # Crea un ítem en la preferencia

    data = request.data
    preference_data = {
        "items": [
            {
                "title": data["titulo"],
                "quantity": 1,
                "unit_price": int(data["precio"]),
            }
        ]
    }

    preference_response = sdk.preference().create(preference_data)
    preference = preference_response["response"]
    return Response(preference, 200)


