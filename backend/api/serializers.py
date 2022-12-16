from django.contrib.auth import get_user_model
from rest_framework import serializers, permissions

from api.models import Turno


# Traduce el objeto a json
from api.models import Pago

class MeSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        # NO UTILIZAMOS FIELDS PORUQE USAMOS EXCLUDE; SE USA UNO U EL OTRO
        exclude = ["password", "is_active", "date_joined", "groups", "is_staff", "is_superuser", "last_login", "user_permissions"]



class TurnoSerializer(serializers.ModelSerializer):
    #Para que use el meserealizer cuando uso el depth
    doctor = MeSerializer()
    class Meta:
        model = Turno
        fields = "__all__"  # Se indican lo fields que quiero incluir en el serializer
        #EL DEPTH SIRVE PARA PODER LLENAR DE DATOS LAS LLAVES FORANEAS
        depth = 1

class TurnoSerializer1(serializers.ModelSerializer):
    #Para que use el meserealizer cuando uso el depth

    class Meta:
        model = Turno
        fields = "__all__"  # Se indican lo fields que quiero incluir en el serializer
        #EL DEPTH SIRVE PARA PODER LLENAR DE DATOS LAS LLAVES FORANEAS
        depth = 1

class RegisterSerializer(serializers.ModelSerializer):
    # Esto hace que no se envie la password encriptada en el response body, solo lo tiene en cuenta al momento de recibir
    password = serializers.CharField(write_only=True)

    class Meta:
        model = get_user_model()
        fields = ["username", "password" , "last_name","email", "first_name"]

    # Hay que overridear el metodo del create para que guarde la password encriptada
    def create(self, validated_data):
        user = get_user_model().objects.create_user(
            # El metodo create_user crea el usuario con la password encriptada
            username=validated_data['username'],
            last_name=validated_data['last_name'],
            first_name=validated_data['first_name'],
            email=validated_data['email'],
            password=validated_data['password']
            # Validated_date diccionario con los fields de la request
        )
        return user



class PagoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pago
        exclude = ["created_at", "updated_at"]

