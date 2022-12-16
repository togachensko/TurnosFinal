from django.contrib.auth import get_user_model
from django.db import models


# Para modificar la BD, primero modificamos este archivo. Luego creamos la migracion con el comando
# python manage.py makemigrations
# Una vez creada la migracion, la ejecutamos con el comando y modificamos la estructura de la BD
# python manage.py migrate

# Create your models here.
class Turno(models.Model):
    # Falta poner las condiciones dentro de los parentesis como los max_length, etc. Cuando modifiquemos esto va a
    # aparecer el error del video https://www.youtube.com/watch?v=SSbmewgBZQc&list=PLquoPC3ciXW_Yih1lwIrnDxyE0ZdsU4lr
    # &index=27
    is_taken = models.BooleanField(blank=True, null=True, default=False)
    hour = models.DateTimeField(blank=False, null=False)
    description = models.TextField(blank=True, null=True, default="--", max_length=100)
    price = models.TextField(blank=True, null=True, default="0")
    is_payed = models.BooleanField(blank=True, null=True, default=False)
    doctor = models.TextField(blank=True, default="test")
    patient_name = models.TextField(blank=True, null=True, default="TURNO", max_length=30)
    patient_lastName = models.TextField(blank=True, null=True, default="DISPONIBLE", max_length=30)
    patient_phone = models.TextField(blank=True, default="---", max_length=30)
    created_at = models.DateTimeField(editable=False, auto_now_add=True, null=True)
    updated_at = models.DateTimeField(editable=False, auto_now_add=True, null=True)
    # HAY QUE PONER ESTA FOREIGN
    doctor = models.ForeignKey(
        get_user_model(),
        on_delete=models.CASCADE,
        related_name="turnos"
    )


class Pago(models.Model):
    monto = models.IntegerField(null=True, default=False)
    payment_code = models.IntegerField(null=True)
    created_at = models.DateTimeField(editable=False, auto_now_add=True, null=True)
    updated_at = models.DateTimeField(editable=False, auto_now_add=True, null=True)
    turno = models.ForeignKey(
        Turno,
        on_delete=models.CASCADE,
        related_name="pagos"
    )
