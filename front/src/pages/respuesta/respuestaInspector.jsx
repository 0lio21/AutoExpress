export default function RespuestaInspector({ setRespuestaInspector }) {
    const [respuesta, setRespuesta] = useState("");
    const [cargando, setCargando] = useState(false);
    const [mensaje, setMensaje] = useState("");
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      setCargando(true);
  
      try {
        const response = await fetch("http://enviar-respuesta-inspector", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ respuesta }),
        });
  
        if (response.ok) {
          setMensaje("Respuesta enviada con éxito. El correo ha sido enviado.");
          // Actualizar la respuesta en el componente de Cotización
          setRespuestaInspector(respuesta);
        } else {
          setMensaje("Hubo un problema al enviar la respuesta.");
        }
      } catch (error) {
        setMensaje("Hubo un problema al enviar la respuesta.");
        console.error("Error al enviar la respuesta: ", error);
      } finally {
        setCargando(false);
      }
    };
  
    return (
      <Box sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>
          Respuesta del Inspector
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Respuesta del Inspector"
                multiline
                rows={4}
                value={respuesta}
                onChange={(e) => setRespuesta(e.target.value)}
                required
              />
            </Grid>
  
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                disabled={cargando}
              >
                {cargando ? <CircularProgress size={24} /> : "Enviar Respuesta"}
              </Button>
            </Grid>
          </Grid>
        </form>
  
        {mensaje && (
          <Box mt={4}>
            <Typography variant="h6">{mensaje}</Typography>
          </Box>
        )}
      </Box>
    );
  }
  