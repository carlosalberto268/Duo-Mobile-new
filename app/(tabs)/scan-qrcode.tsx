/**
 * Scan QR Code Screen
 * Scanner for NF-e, PIX, and fiscal coupons
 */
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { CameraView, Camera } from 'expo-camera';
import { MaterialIcons } from '@expo/vector-icons';
import { Colors, Spacing, Typography, BorderRadius } from '@/constants/theme';

export default function ScanQRCodeScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    
    // Parse QR Code data
    // PIX format: "00020126..."
    // NF-e format: URL or numeric key
    
    let parsedData: any = {};
    
    if (data.startsWith('00020126')) {
      // PIX QR Code
      parsedData = parsePIX(data);
    } else if (data.includes('nfe') || data.length === 44) {
      // NF-e
      parsedData = parseNFe(data);
    } else {
      Alert.alert('Código não reconhecido', 'Este QR Code não é um PIX ou NF-e válido.');
      setScanned(false);
      return;
    }

    // Navigate back with parsed data
    Alert.alert(
      'QR Code Lido!',
      `Tipo: ${parsedData.type}\nValor: R$ ${parsedData.value || 'N/A'}`,
      [
        {
          text: 'OK',
          onPress: () => {
            // TODO: Pass data to add-transaction screen
            router.back();
          },
        },
      ]
    );
  };

  const parsePIX = (data: string): any => {
    // Simplified PIX parser
    // Real implementation would parse EMV format
    return {
      type: 'PIX',
      value: '0,00', // Extract from data
      description: 'Pagamento PIX',
    };
  };

  const parseNFe = (data: string): any => {
    // Simplified NF-e parser
    // Real implementation would fetch from SEFAZ API
    return {
      type: 'NF-e',
      value: '0,00', // Would come from API
      description: 'Compra',
      category: '🛒 Compras',
    };
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Solicitando permissão da câmera...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <MaterialIcons name="camera-alt" size={64} color={Colors.textSecondary} />
        <Text style={styles.message}>Sem acesso à câmera</Text>
        <Text style={styles.messageSubtitle}>
          Permita o acesso nas configurações do dispositivo
        </Text>
        <TouchableOpacity style={styles.button} onPress={() => router.back()}>
          <Text style={styles.buttonText}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: ['qr'],
        }}
      >
        <View style={[styles.overlay, { paddingTop: insets.top }]}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
              <MaterialIcons name="close" size={28} color={Colors.textWhite} />
            </TouchableOpacity>
          </View>

          <View style={styles.scanArea}>
            <View style={styles.scanFrame}>
              <View style={[styles.corner, styles.cornerTopLeft]} />
              <View style={[styles.corner, styles.cornerTopRight]} />
              <View style={[styles.corner, styles.cornerBottomLeft]} />
              <View style={[styles.corner, styles.cornerBottomRight]} />
            </View>
            <Text style={styles.instruction}>
              Aponte para o QR Code da NF-e, Cupom Fiscal ou PIX
            </Text>
          </View>

          {scanned && (
            <TouchableOpacity
              style={styles.scanAgainButton}
              onPress={() => setScanned(false)}
            >
              <MaterialIcons name="refresh" size={24} color={Colors.textWhite} />
              <Text style={styles.scanAgainText}>Escanear Novamente</Text>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  header: {
    padding: Spacing.md,
  },
  closeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(0,0,0,0.5)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanFrame: {
    width: 280,
    height: 280,
    position: 'relative',
  },
  corner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: Colors.textWhite,
  },
  cornerTopLeft: {
    top: 0,
    left: 0,
    borderTopWidth: 4,
    borderLeftWidth: 4,
  },
  cornerTopRight: {
    top: 0,
    right: 0,
    borderTopWidth: 4,
    borderRightWidth: 4,
  },
  cornerBottomLeft: {
    bottom: 0,
    left: 0,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
  },
  cornerBottomRight: {
    bottom: 0,
    right: 0,
    borderBottomWidth: 4,
    borderRightWidth: 4,
  },
  instruction: {
    marginTop: Spacing.xl,
    fontSize: Typography.body,
    color: Colors.textWhite,
    textAlign: 'center',
    paddingHorizontal: Spacing.xl,
  },
  scanAgainButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gradientStart,
    marginHorizontal: Spacing.xl,
    marginBottom: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
    gap: Spacing.sm,
  },
  scanAgainText: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
  },
  message: {
    fontSize: Typography.h4,
    color: Colors.textWhite,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  messageSubtitle: {
    fontSize: Typography.body,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: Spacing.xl,
    paddingHorizontal: Spacing.xl,
  },
  button: {
    backgroundColor: Colors.gradientStart,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.sm,
  },
  buttonText: {
    fontSize: Typography.body,
    fontWeight: Typography.semiBold,
    color: Colors.textWhite,
  },
});
